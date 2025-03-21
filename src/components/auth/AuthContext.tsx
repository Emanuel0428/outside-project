import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface Purchase {
  id: string;
  date: string;
  items: { productId: number; variant: string; quantity: number; price: number }[];
  total: number;
  status: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean; // Añadimos esta propiedad para mayor claridad
  isAdmin: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  purchaseHistory: Purchase[];
  allPurchases: Purchase[];
  addPurchase: (items: { productId: number; variant: string; quantity: number; price: number }[], total: number, status?: string) => Promise<void>;
  updatePurchaseStatus: (purchaseId: string, status: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Añadimos este estado
  const [isAdmin, setIsAdmin] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (user_id: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user_id)
      .single();
    if (error) console.error('Error fetching user role:', error);
    else setIsAdmin(data?.role === 'admin');
  };

  useEffect(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setSession(parsedSession);
      setUser(parsedSession?.user ?? null);
      setIsAuthenticated(!!parsedSession?.user); 
      supabase.auth.setSession(parsedSession);
      if (parsedSession?.user) {
        checkAdminStatus(parsedSession.user.id);
      }
    } else {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user); 
        if (session?.user) {
          checkAdminStatus(session.user.id);
        }
      });
    }
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user); 
      if (session && localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('supabaseSession', JSON.stringify(session));
      }
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPurchases();
      if (isAdmin) fetchAllPurchases();
    } else {
      setPurchaseHistory([]);
      setAllPurchases([]);
    }
  }, [user, isAdmin]);

  const fetchPurchases = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching purchases:', error);
    else setPurchaseHistory(data || []);
  };

  const fetchAllPurchases = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Datos crudos de Supabase:', data);

    if (error) {
      console.error('Error fetching all purchases:', error);
      setAllPurchases([]);
    } else {
      const mappedPurchases = data.map((purchase) => ({
        id: purchase.id,
        date: purchase.date || purchase.created_at,
        items: purchase.items,
        total: Number(purchase.total),
        status: purchase.status,
      }));
      console.log('Purchases mapeados:', mappedPurchases);
      setAllPurchases(mappedPurchases);
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('supabaseSession', JSON.stringify(data.session));
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('supabaseSession');
    }
  };

  const register = async (email: string, name: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    localStorage.removeItem('supabaseSession');
    localStorage.removeItem('rememberMe');
  };

  const addPurchase = async (
    items: { productId: number; variant: string; quantity: number; price: number }[],
    total: number,
    status: string = 'pending'
  ) => {
    if (!user) throw new Error('Debe iniciar sesión para realizar una compra');
    const { error } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        items,
        total,
        status,
      });
    if (error) throw error;
    await fetchPurchases();
    if (isAdmin) await fetchAllPurchases();
  };

  const updatePurchaseStatus = async (purchaseId: string, status: string) => {
    if (!isAdmin) throw new Error('Solo los administradores pueden actualizar el estado de las compras');

    const trimmedStatus = status.trim();
    console.log('Intentando actualizar - purchaseId:', purchaseId, 'status:', trimmedStatus);

    const { error, data } = await supabase
      .from('purchases')
      .update({ status: trimmedStatus })
      .match({ id: purchaseId })
      .select('*');

    console.log('Resultado de la actualización - data:', data, 'error:', error);

    if (error) {
      console.error('Error de Supabase:', error);
      throw error;
    }

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('No se actualizó ningún registro - purchaseId:', purchaseId);
      throw new Error('No se encontró la compra con el ID proporcionado o no se tiene permiso para actualizar');
    }

    await fetchPurchases();
    await fetchAllPurchases();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw new Error(error.message);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        purchaseHistory,
        allPurchases,
        addPurchase,
        updatePurchaseStatus,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
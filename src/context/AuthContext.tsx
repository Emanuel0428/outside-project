import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabaseClient';
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
  isAdmin: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  purchaseHistory: Purchase[];
  allPurchases: Purchase[];
  addPurchase: (items: { productId: number; variant: string; quantity: number; price: number }[], total: number, status?: string) => Promise<void>;
  updatePurchaseStatus: (purchaseId: string, status: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>; // Nueva función
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setSession(parsedSession);
      setUser(parsedSession?.user ?? null);
      supabase.auth.setSession(parsedSession); // Restaurar sesión
    } else {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        setSession(session);
        setUser(session?.user ?? null);
      });
    }
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(( _event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session && localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('supabaseSession', JSON.stringify(session));
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
  }, [user]);

  const isAdmin = user?.user_metadata?.role === 'admin';

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
    if (error) console.error('Error fetching all purchases:', error);
    else setAllPurchases(data || []);
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
    if (!user) throw new Error('No user logged in');
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
    if (!isAdmin) throw new Error('Only admins can update purchase status');
    const { error } = await supabase
      .from('purchases')
      .update({ status })
      .eq('id', purchaseId);
    if (error) throw error;
    await fetchPurchases();
    await fetchAllPurchases();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // URL donde el usuario reseteará su contraseña
    });
    if (error) throw new Error(error.message);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{ user, session, isAdmin, login, register, logout, purchaseHistory, allPurchases, addPurchase, updatePurchaseStatus, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
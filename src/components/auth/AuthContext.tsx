import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface Purchase {
  id: string;
  date: string;
  items: { productId: number; variant: string; quantity: number; price: number }[];
  total: number;
  status: string;
}

interface UserMetadata {
  name: string;
  email: string;
  phone?: string;
  documentType?: string;
  document?: string;
}

interface ExtendedUser extends User {
  user_metadata: UserMetadata;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean; 
  isAdmin: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  register: (
    email: string, 
    name: string, 
    password: string,
    fullName: string,
    phone: string,
    documentType: string,
    document: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  purchaseHistory: Purchase[];
  allPurchases: Purchase[];
  addPurchase: (items: { productId: number; variant: string; quantity: number; price: number }[], total: number, status?: string) => Promise<void>;
  updatePurchaseStatus: (purchaseId: string, status: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserMetadata>) => Promise<void>;
  getUserDetails: () => Promise<UserMetadata>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define useAuth fuera del componente AuthProvider para evitar problemas con HMR
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAdmin, setIsAdmin] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [allPurchases, setAllPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (user_id: string) => {
    const { data, error } = await supabase
      .from('roles')
      .select('role')
      .eq('user_id', user_id)
      .single();
    if (error) console.error('Error fetching user role:', error);
    else setIsAdmin(data?.role === 'admin');
  };

  const updateUserProfile = async (updates: Partial<UserMetadata>) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase.auth.updateUser({
      data: { ...user.user_metadata, ...updates }
    });
    if (error) throw error;
    if (data.user) {
      setUser({
        ...data.user,
        user_metadata: {
          name: '',
          email: '',
          ...data.user.user_metadata,
        },
      });
    }
    return;
  };
  const getUserDetails = async (): Promise<UserMetadata> => {
    if (!user) throw new Error('User not authenticated');
    
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    const userMetadata = currentUser?.user_metadata || {};
    return {
      name: userMetadata.name || '',
      email: userMetadata.email || '',
      phone: userMetadata.phone,
      documentType: userMetadata.documentType,
      document: userMetadata.document,
    };
  };

  useEffect(() => {
    const savedSession = localStorage.getItem('supabaseSession');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setSession(parsedSession);
      setUser(parsedSession?.user ? { ...parsedSession.user, user_metadata: { name: '', email: '', ...parsedSession.user.user_metadata } } : null);
      setIsAuthenticated(!!parsedSession?.user); 
      supabase.auth.setSession(parsedSession);
      if (parsedSession?.user) {
        checkAdminStatus(parsedSession.user.id);
      }
    } else {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        setSession(session);
        setUser(session?.user ? { ...session.user, user_metadata: { name: '', email: '', ...session.user.user_metadata } } : null);
        setIsAuthenticated(!!session?.user); 
        if (session?.user) {
          checkAdminStatus(session.user.id);
        }
      });
    }
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setSession(session);
      setUser(session?.user ? { ...session.user, user_metadata: { name: '', email: '', ...session.user.user_metadata } } : null);
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
    
    if (error) {
      console.error('Error fetching purchases:', error);
      setPurchaseHistory([]);
    } else {
      // Procesar los datos para asegurar que items sea un array
      const processedData = data?.map(purchase => {
        // Intentamos parsear items si es un string
        let parsedItems = [];
        try {
          if (typeof purchase.items === 'string') {
            parsedItems = JSON.parse(purchase.items);
          } else if (Array.isArray(purchase.items)) {
            parsedItems = purchase.items;
          }
        } catch (e) {
          console.error('Error parsing items:', e);
        }

        return {
          ...purchase,
          items: parsedItems,
          date: purchase.date || purchase.created_at,
          total: Number(purchase.total)
        };
      }) || [];
      
      console.log('Purchases processed:', processedData);
      setPurchaseHistory(processedData);
    }
  };

  const fetchAllPurchases = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all purchases:', error);
      setAllPurchases([]);
    } else {
      // Procesar los datos para asegurar que items sea un array
      const mappedPurchases = data?.map(purchase => {
        // Intentamos parsear items si es un string
        let parsedItems = [];
        try {
          if (typeof purchase.items === 'string') {
            parsedItems = JSON.parse(purchase.items);
          } else if (Array.isArray(purchase.items)) {
            parsedItems = purchase.items;
          }
        } catch (e) {
          console.error('Error parsing items:', e);
        }

        return {
          id: purchase.id,
          date: purchase.date || purchase.created_at,
          items: parsedItems,
          total: Number(purchase.total),
          status: purchase.status,
        };
      }) || [];
      
      console.log('All purchases processed:', mappedPurchases);
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

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw new Error(error.message);
  };

  const register = async (email: string, name: string, password: string,
    fullName: string,
    phone: string,
    documentType: string,
    document: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { 
          name,
          fullName,
          phone,
          documentType,
          document
        } 
      },
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
    
    // Asegurarse de que items sea un array JSON válido
    const itemsArray = Array.isArray(items) ? items : [];
    
    const { error } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        items: itemsArray,
        total,
        status,
        date: new Date().toISOString(),
        created_at: new Date().toISOString()
      });
    if (error) {
      console.error('Error al guardar la compra:', error);
      throw error;
    }
    await fetchPurchases();
    if (isAdmin) await fetchAllPurchases();
  };

  const updatePurchaseStatus = async (purchaseId: string, status: string) => {
    if (!isAdmin) throw new Error('Solo los administradores pueden actualizar el estado de las compras');

    // Normalize status to store 
    const statusMap: { [key: string]: string } = {
      'Pendiente': 'pending',
      'Pagado': 'paid',
      'Enviado': 'shipped',
      'Completado': 'completed',
      'Rechazado': 'declined'
    };
    
    // Use the mapped status if it exists, otherwise use the original
    const normalizedStatus = statusMap[status] || status;
    const trimmedStatus = normalizedStatus.trim();

    console.log(`Actualizando estado de compra ${purchaseId} a ${trimmedStatus}`);

    try {
      const { error, data } = await supabase
        .from('purchases')
        .update({ status: trimmedStatus })
        .eq('id', purchaseId)
        .select();

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error('No se encontró la compra con el ID proporcionado o no se tiene permiso para actualizar');
      }

      await fetchPurchases();
      await fetchAllPurchases();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      throw error;
    }
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
        signInWithGoogle,
        register,
        logout,
        purchaseHistory,
        allPurchases,
        addPurchase,
        updatePurchaseStatus,
        resetPassword,
        updateUserProfile,
        getUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
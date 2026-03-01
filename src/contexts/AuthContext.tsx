import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isApproved: boolean;
  isAdmin: boolean;
  profile: { full_name: string; email: string; trial_started_at: string; has_paid: boolean } | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isApproved: false,
  isAdmin: false,
  profile: null,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<{ full_name: string; email: string; trial_started_at: string; has_paid: boolean } | null>(null);

  const fetchUserData = async (userId: string) => {
    const [profileRes, roleRes] = await Promise.all([
      supabase.from("profiles").select("full_name, email, is_approved, trial_started_at, has_paid").eq("user_id", userId).single(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    if (profileRes.data) {
      setIsApproved(profileRes.data.is_approved);
      setProfile({ full_name: profileRes.data.full_name, email: profileRes.data.email, trial_started_at: profileRes.data.trial_started_at, has_paid: profileRes.data.has_paid });
    }

    if (roleRes.data) {
      setIsAdmin(roleRes.data.some((r) => r.role === "admin"));
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchUserData(session.user.id), 0);
      } else {
        setIsApproved(false);
        setIsAdmin(false);
        setProfile(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isApproved, isAdmin, profile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

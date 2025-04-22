import { profile } from "@/constants/Types";
import { supabase } from "@/utils/supabase";
import { useContext, useState, useEffect, createContext } from "react";
import { useAuth } from "./Auth";

// create a context for the profile
const ProfileContext = createContext<{
  profile: profile | undefined | null;
  setProfile: React.Dispatch<React.SetStateAction<profile | undefined>>;
}>({ profile: null, setProfile: () => {} });

export const ProfileProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<profile>();
  const ctx = useAuth();
  const { user } = useContext(ctx);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("Profiles")
          .select()
          .eq("user_id", user.id);
        if (error) throw error;
        if (data) setProfile(data[0]);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!user) setProfile(undefined);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    profile,
    setProfile,
  };

  // use a provider to pass down the value
  return (
    <ProfileContext.Provider value={value}>
      {!loading && children}
    </ProfileContext.Provider>
  );
};

// export the useAuth hook
export const useProfile = () => {
  return ProfileContext;
};

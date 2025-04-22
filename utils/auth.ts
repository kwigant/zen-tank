import { router } from "expo-router";
import { supabase } from "./supabase";
import { SignInProps, SignUpProps } from "@/constants/Types";
import { Alert } from "react-native";

// create account and update db with current user
export async function signUpWithEmail({email, password, first, last}: SignUpProps ) {
    const {
        data: { session },
        error,
    } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw error;
    if (session) {
        const { data, error } = await supabase
        .from("Profiles")
        .insert({
            email: session?.user.email,
            user_id: session?.user.id,
            first_name: first,
            last_name: last,
            img: "",
            tanks: [],
            initials: `${first.charAt(0)}${last.charAt(0)}`,
        })
        .select();
        if (error) {
            console.error("Error fetching data:", error);
        }
        if (data && data[0]) router.navigate("/(tabs)/tanks");
    }
}

// Log in current user
export async function signInWithEmail({email, password}: SignInProps) {
    // setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) Alert.alert(error.message);
    // setLoading(false);
    if (data) return data;
}

// Sign out current user
export async function signOutUser() {
    await supabase.auth.signOut();
    router.navigate("/");
}
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { style } from "@/constants/Styles";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

// Register / Sign Up User
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
 
  async function signInWithEmail() {
    
    const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) Alert.alert(error.message);
 
    if (data) router.navigate("/(app)");
  }

  async function signUpWithEmail() {
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
        if (data && data[0]) router.navigate("/(app)");
    }
  }

  return (
    <View style={style.authContainer}>
      <View style={[style.verticallySpaced, style.mt20]}>
        <View style={{marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Text
            variant="headlineLarge"
          >
            Zen Tank
          </Text>
          <Text variant="bodyMedium">Visualize Your Ecosystem</Text>
        </View>

        {isSignUp ? (
          <View style={[style.row, { marginBottom: 8 }]}>
            <TextInput
              label="First Name"
              style={{ flexGrow: 1, marginRight: 8 }}
              onChangeText={(text) => setFirst(text)}
              value={first}
              mode="outlined"
              placeholder="John"
              autoCapitalize={"none"}
            />
            <TextInput
              label="Last Name"
              style={{ flexGrow: 1 }}
              onChangeText={(text) => setLast(text)}
              value={last}
              mode="outlined"
              placeholder="Doe"
              autoCapitalize={"none"}
            />
          </View>
        ) : null}
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          mode="outlined"
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={style.verticallySpaced}>
        <TextInput
          label="Password"
          mode="outlined"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View
        style={[
          style.verticallySpaced,
          { justifyContent: "center", marginTop: 24 },
        ]}
      >
        <Button
          mode="text"
          style={{ marginBottom: 8 }}
          onPress={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? (
            <Text>Already have an account? Log in here</Text>
          ) : (
            <Text>Need an account? Sign up here</Text>
          )}
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            isSignUp
              ? signUpWithEmail()
              : signInWithEmail()
          }
        >
          {isSignUp ? <Text>Create Account</Text> : <Text>Sign In</Text>}
        </Button>
      </View>
    </View>
  );
}

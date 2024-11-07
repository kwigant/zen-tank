import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../utils/supabase";
import { Button, Text, TextInput } from "react-native-paper";
import { router } from "expo-router";

// Register / Sign Up User
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    if (!error) router.navigate("/dashboard");
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) console.log(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
    if (!error) router.navigate("/dashboard");
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text
          variant="headerLarge"
          style={{ textAlign: "center", marginBottom: 16 }}
        >
          Zen Tank
        </Text>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          mode="outlined"
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading} onPress={() => signInWithEmail()}>
          Sign In
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          {" "}
          Sign Up{" "}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    height: "100%",
    padding: 12,
    display: "flex",
    justifyContent: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  gradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

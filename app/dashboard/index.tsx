import { Link, router } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton, Button } from "react-native-paper";
import { supabase } from '../../utils/supabase'
import { Session } from '@supabase/supabase-js'

export default function DashboardScreen() {
  const [session, setSession] = React.useState<Session | null>(null)

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  async function signOutUser() {
    await supabase.auth.signOut()
    router.navigate('/')
  }

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.center}>
        <Text variant="headerLarge">Welcome {session?.user.email} </Text>
        <Link href="/fish-tanks">
          <IconButton
            icon="cube"
            size={60}
            style={[styles.iconBtn]}
            mode="outlined"
          />
        </Link>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Link href="/fish-search">
            <IconButton
              icon="fish"
              size={60}
              style={[styles.iconBtn]}
              mode="outlined"
            />
          </Link>
          <Link href="/plant-search">
            <IconButton
              icon="leaf"
              size={60}
              style={[styles.iconBtn]}
              mode="outlined"
            />
          </Link>
        </View>
        <Button onPress={()=> signOutUser()}>Sign Out</Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  iconBtn: {
    backgroundColor: "#E8E8E8",
  },
  center: {
    marginTop: -24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

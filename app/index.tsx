import { Link } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.center}>
        <Text variant="headerLarge">Test Tank</Text>
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

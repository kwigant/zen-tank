import UserMenu from "@/components/UserMenu";
import { style } from "@/constants/Styles";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <View style={[style.justifiedRow, { padding: 24, alignItems: "center" }]}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("@/assets/images/zen-tank.png")}
        />
        <Searchbar
          style={{ flexGrow: 1, marginHorizontal: 12 }}
          value={searchQuery}
        />
        <UserMenu />
      </View>
      <Text>Search Screen</Text>
    </View>
  );
}

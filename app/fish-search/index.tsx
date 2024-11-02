import * as React from "react";
import { View } from "react-native";
import fishList from "../../assets/data/fish.json";
import { FlatList } from "react-native";
import GridItem from "@/components/GridItem";
import { Chip, Icon, IconButton, Searchbar } from "react-native-paper";
import { Text } from "react-native-paper";
import { style } from "@/constants/Global";

export default function FishSearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [fresh, setFresh] = React.useState(true);
  const [salt, setSalt] = React.useState(false);
  return (
    <View style={{ backgroundColor: "#fff", padding: 24, paddingTop: 0 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        inputStyle={{ minHeight: 0 }}
        style={style.searchBar}
      />
      <View style={[style.justifiedRow]}>
        <View style={[style.row]}>
          <Chip
            style={fresh ? style.chipActive : style.chipInactive}
            icon={() => <Icon source="water" size={16} color="white" />}
            onPress={() => setFresh(!fresh)}
          >
            <Text variant="bodyWhite">Fresh</Text>
          </Chip>
          <Chip
            style={salt ? style.chipActive : style.chipInactive}
            icon={() => <Icon source="water" size={16} color="white" />}
            onPress={() => setSalt(!salt)}
          >
            <Text variant="bodyWhite">Salt</Text>
          </Chip>
        </View>
        <IconButton icon="filter" size={24} iconColor="black" />
      </View>

      <FlatList
        data={fishList}
        renderItem={({ item }) => {
          return <GridItem fish={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

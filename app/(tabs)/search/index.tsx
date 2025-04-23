import { searchFishData } from "@/api/fish";
import { searchPlantData } from "@/api/plants";
import GridItem from "@/components/GridItem";
import Tabs from "@/components/Tabs";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useQuery } from "react-query";

enum SearchType {
  Fish = "fish",
  Plants = "plants",
  // Tanks = "tanks",
}

export default function SearchScreen() {
  const [searchType, setSearchType] = useState(SearchType.Fish);
  const [tab, setTab] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: fishData, isLoading } = useQuery(
    ["fishResults", searchTerm],
    () => searchFishData(searchTerm),
    {
      enabled: !!searchTerm, // Disable query when searchTerm is empty
    }
  );

  const { data: plantData, isLoading: plantLoad } = useQuery(
    ["plantResults", searchTerm],
    () => searchPlantData(searchTerm),
    {
      enabled: !!searchTerm, // Disable query when searchTerm is empty
    }
  );
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
  };

  return (
    <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <Searchbar
        style={{ margin: 12 }}
        value={searchTerm}
        onChangeText={(e) => handleSearchChange(e)}
      />
      <Tabs tabs={["Fish", "Plants"]} tab={tab} setTab={setTab} />
      {isLoading && <Text>Loading...</Text>}
      {tab === 0 ? (
        <FlatList
          data={fishData}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={searchTerm !== '' ? <Text>No Fish Found</Text> : <Text>What fish are you looking for?</Text>}
          renderItem={({ item }) => <GridItem isFish={true} item={item} tab="search"/>}
        />
      ) : (
        <FlatList
          data={plantData}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={searchTerm !== '' ? <Text>No Plants Found</Text> : <Text>What plants are you looking for?</Text>}
          renderItem={({ item }) => <GridItem isFish={false} item={item} tab="search"/>}
        />
      )}
    </View>
  );
}

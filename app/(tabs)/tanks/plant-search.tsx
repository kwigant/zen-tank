import * as React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import GridItem from "@/components/layouts/GridItem";
import { fetchPlantList, searchPlantData } from "@/api/plants";
import { useQuery, useQueryClient } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { Searchbar, useTheme } from "react-native-paper";
import Loading from "@/components/layouts/Loading";

export default function PlantSearchScreen() {
  const { tank_id, tank_name, fish_count, plant_count } =
    useLocalSearchParams();
  const [searchTerm, setSearchTerm] = React.useState("");
  const queryClient = useQueryClient()
  const theme = useTheme();
  const { data: plantList, isLoading } = useQuery(
    ["plantList", searchTerm],
    () => searchPlantData(searchTerm),
    // {
    //   enabled: !!searchTerm, // Disable query when searchTerm is empty
    // }
  );
  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    queryClient.invalidateQueries('tankPlants')

  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 24,
        paddingTop: 0,
        height: "100%",
        display: "flex",
      }}
    >
      <Searchbar
        placeholder="Search"
        value={searchTerm}
        onChangeText={(e) => handleSearchChange(e)}
        style={{ marginVertical: 12 }}
        inputStyle={{ minHeight: 0 }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={plantList}
          renderItem={({ item }) => {
            return (
              <GridItem
                item={item}
                isFish={false}
                tab={"tanks"}
                tank_name={tank_name ? tank_name.toString() : ""}
                tank_id={tank_id ? tank_id.toString() : ""}
                fish_count={fish_count ? fish_count.toString() : "0"}
                plant_count={plant_count ? plant_count.toString() : "0"}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

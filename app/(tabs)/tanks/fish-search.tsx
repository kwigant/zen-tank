import * as React from "react";
import { View, Text, FlatList } from "react-native";
import GridItem from "@/components/layouts/GridItem";
import { useQuery, useQueryClient } from "react-query";
import { fetchFishList, searchFishData } from "@/api/fish";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { IconButton, Searchbar, useTheme } from "react-native-paper";
import Loading from "@/components/layouts/Loading";

export default function FishSearchScreen() {
  const { tank_id, tank_name, fish_count, plant_count } =
    useLocalSearchParams();
  const theme = useTheme();
 const queryClient = useQueryClient()
const [searchTerm, setSearchTerm] = React.useState("");

  const { data: fishList, isLoading } = useQuery(
    ["fishList", searchTerm],
    () => searchFishData(searchTerm),
    // {
    //   enabled: !!searchTerm, // Disable query when searchTerm is empty
    // }
  );

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    queryClient.invalidateQueries('tankFish')
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 24,
        paddingTop: 0,
      }}
    >
      {/* <View style={[style.row, { width: "100%", marginVertical: 12 }]}>
        {/* <Image style={{width: 330, height: 180}} source={require('../assets/images/full-tank.png')}/> */}

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
          data={fishList}
          style={{ marginBottom: 60 }}
          renderItem={({ item }) => {
            return (
              <GridItem
                item={item}
                isFish={true}
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

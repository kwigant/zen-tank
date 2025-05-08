import * as React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native";
import GridItem from "@/components/layouts/GridItem";
import { fetchPlantList } from "@/api/plants";
import { useQuery } from "react-query";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "react-native-paper";
import Loading from "@/components/layouts/Loading";

export default function PlantSearchScreen() {
  const { tank_id, tank_name, fish_count, plant_count } =
    useLocalSearchParams();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data: plantList, isLoading } = useQuery({
    queryKey: "plantList",
    queryFn: fetchPlantList,
  });

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 24,
        paddingTop: 0,
        marginBottom: 60,
        height: "100%",
      }}
    >
      {/* <View style={[style.row, { width: "100%", marginVertical: 12 }]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          inputStyle={{ minHeight: 0 }}
          style={style.searchBar}
        />
        <IconButton
          icon="filter-variant"
          size={24}
          iconColor="black"
          style={{ margin: 0 }}
        />
      </View> */}
      {isLoading ? (
        <Loading/>
      ) : (
        <FlatList
          data={plantList}
          style={{ marginBottom: 60 }}
          renderItem={({ item }) => {
            return (
               <GridItem
                  item={item}
                  isFish={false}
                  tab={"tanks"}
                  tank_name={tank_name ? tank_name.toString(): ''}
                  tank_id={tank_id ? tank_id.toString(): ''}
                  fish_count={fish_count ? fish_count.toString() : '0'}
                  plant_count={plant_count ? plant_count.toString(): '0'}
                />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

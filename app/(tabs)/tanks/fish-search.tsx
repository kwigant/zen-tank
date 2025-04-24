import * as React from "react";
import { View, Text, FlatList } from "react-native";
import GridItem from "@/components/layouts/GridItem";
import { useQuery } from "react-query";
import { fetchFishList } from "@/api/fish";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useTheme } from "react-native-paper";

export default function FishSearchScreen() {
  const { tank_id, tank_name, fish_count, plant_count } =
    useLocalSearchParams();
    const theme= useTheme()
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data: fishList, isLoading } = useQuery({
    queryKey: "fishList",
    queryFn: fetchFishList,
  });

  return (
    <View style={{ backgroundColor: theme.colors.background, padding: 24, paddingTop: 0 }}>
      {/* <View style={[style.row, { width: "100%", marginVertical: 12 }]}>
        {/* <Image style={{width: 330, height: 180}} source={require('../assets/images/full-tank.png')}/> */}

      {/* <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchFish}
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
        <Text>Loading...</Text>
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

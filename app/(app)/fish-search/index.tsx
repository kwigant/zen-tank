import * as React from "react";
import { View, FlatList } from "react-native";
import GridItem from "@/components/GridItem";
import { IconButton, Searchbar } from "react-native-paper";
import { style } from "@/constants/Styles";
import { supabase } from "@/utils/supabase";
import { fish } from "@/constants/Types";

export default function FishSearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setFishData] = React.useState([] as fish[]);

  React.useEffect(() => {
    fetchFishData()
  }, []);

  async function fetchFishData(){
    const { data, error } = await supabase
      .from("Fish")
      .select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFishData(data as fish[]);
    }
  };

  async function searchFishData() {
    const { data, error } = await supabase
      .from("Fish")
      .select()
      .ilike('name', `%${searchQuery}%`)
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFishData(data as fish[]);
    }
  }
  return (
    <View style={{ backgroundColor: "#fff", padding: 24, paddingTop: 0 }}>
      <View style={[style.row, { width: "100%", marginVertical: 12 }]}>
      {/* <Image style={{width: 330, height: 180}} source={require('../assets/images/full-tank.png')}/> */}

        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={()=> searchFishData}
          inputStyle={{ minHeight: 0 }}
          style={style.searchBar}
        />
        <IconButton
          icon="filter-variant"
          size={24}
          iconColor="black"
          style={{ margin: 0 }}
        />
      </View>

      <FlatList
        data={data}
        style={{ marginBottom: 60 }}
        renderItem={({ item }) => {
          return <GridItem item={item} isFish={true} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

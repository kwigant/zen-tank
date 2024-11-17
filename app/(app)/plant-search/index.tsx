import * as React from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import GridItem from "@/components/GridItem";
import { IconButton, Searchbar } from "react-native-paper";
import { style } from "@/constants/Styles";
import { supabase } from "@/utils/supabase";
import { plant } from "@/constants/Types";

export default function PlantSearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([] as plant[]);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log('calling')
      const { data, error } = await supabase
        .from("Plants") // Replace with your table name
        .select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(data as plant[]);
      }
    };

    fetchData();
  }, []);

  async function searchData() {
    const { data, error } = await supabase
      .from("Plants") // Replace with your table name
      .select()
      .ilike('name', `%${searchQuery}%`)
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data as plant[]);
    }
  }
  return (
    <View style={{ backgroundColor: "#fff", padding: 24, paddingTop: 0, marginBottom: 60, height: '100%' }}>
      <View style={[style.row, { width: "100%", marginVertical: 12 }]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchData}
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
        renderItem={({ item }) => {
          return <GridItem item={item} isFish={false} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

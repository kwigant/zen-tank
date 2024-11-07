import * as React from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import GridItem from "@/components/GridItem";
import { Chip, Icon, IconButton, Searchbar } from "react-native-paper";
import { Text } from "react-native-paper";
import { style } from "@/constants/Global";
import { supabase } from "@/utils/supabase";
import {fish} from "../../constants/Types";

export default function FishSearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [fresh, setFresh] = React.useState(true);
  const [salt, setSalt] = React.useState(false);
  const [data, setData] = React.useState([] as fish[]);

  
  React.useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Fish') // Replace with your table name
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data as fish[]);
      }
    };

    fetchData();
  }, []);

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
        data={data}
        renderItem={({ item }) => {
          return <GridItem item={item} isFish={true}/>;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

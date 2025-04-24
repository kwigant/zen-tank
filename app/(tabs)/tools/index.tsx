
import { FlatList, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

export default function ToolsScreen() {
 const theme = useTheme()
  const toolsList = ['Tank To Dos', 'Substrate Calculator',  'Starter Tanks' ]
  return (
    <View style={{ backgroundColor: theme.colors.background, paddingTop: 0, height: "100%" }}>
        <FlatList
          data={toolsList}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
    </View>
  );
}

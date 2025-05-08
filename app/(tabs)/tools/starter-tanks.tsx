import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function StarterTanks() {
    const theme = useTheme()
    return (
        <View style={{backgroundColor: theme.colors.background, height: '100%'}}>
            <Text>Starter Tanks</Text>
        </View>
    )
}
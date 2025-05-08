import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function SubstrateCalculator() {
    const theme = useTheme()
    return (
        <View style={{backgroundColor: theme.colors.background, height: '100%'}}>
            <Text>Substrate Calculator</Text>
        </View>
    )
}
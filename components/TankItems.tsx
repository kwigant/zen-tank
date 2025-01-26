import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

type TankItemProps = {
    tank: tank, 
}

export default function TankItem({tank}: TankItemProps) {
    return (
        // <TouchableOpacity onPress={()=> (setCurrentTank(tank))}>
            <View style={style.gridItem}>
                <Text variant="bodyLarge">{tank.name}</Text>
                <Text variant="bodySmall">Size: {tank.size}</Text>
                <Text variant="bodySmall">Fish: {tank.fish}</Text>
                <Text variant="bodySmall">Plants: {tank.plants}</Text>
            </View>
        // </TouchableOpacity>
    )
}


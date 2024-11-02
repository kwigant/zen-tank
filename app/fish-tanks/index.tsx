import React, { Suspense } from "react";
import { View } from "react-native";
import { Text, IconButton, TextInput } from "react-native-paper";
import { style } from "@/constants/Global";
import TankModel from "@/components/TankModel";
// import { Canvas } from '@react-three/fiber/native'
// import { useGLTF } from '@react-three/drei/native'
// import modelPath from './path/to/model.glb'
export default function FishTankScreen({}) {
  const [editName, setEditName] = React.useState(false);
  const [tankName, setTankName] = React.useState("My first tank :D");
  const [size, setSize] = React.useState(5);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 24,
        paddingTop: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* <TankModel/> */}
      <View style={[style.row, { marginBottom: 16 }]}>
        <IconButton
          icon="pencil"
          size={18}
          iconColor="black"
          onPress={() => setEditName(!editName)}
        />
        {editName ? (
          <TextInput
            style={{ backgroundColor: "white" }}
            value={tankName}
            onChangeText={(text) => setTankName(text)}
          />
        ) : (
          <Text variant="headerLarge" style={{ textAlign: "center" }}>
            {tankName}
          </Text>
        )}
      </View>
      <View style={style.row}>
        <IconButton icon="minus" onPress={() => setSize(size - 1)} />
        <Text variant="body" style={{ textAlign: "center", marginBottom: 16 }}>
          {size} Gallons
        </Text>
        <IconButton icon="plus" onPress={() => setSize(size + 1)} />
      </View>
      <Text
        variant="bodySmall"
        style={{ textAlign: "center", marginBottom: 16 }}
      >
        Remember to pick a size that comfortably fits both your fish and your
        home
      </Text>
    </View>
  );
}

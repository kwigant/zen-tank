import React, { Suspense, useEffect, useState } from "react";
import { View } from "react-native";
import { Text, IconButton, TextInput } from "react-native-paper";
import { style } from "@/constants/Global";

import { supabase } from "@/utils/supabase";

export default function FishTankScreen({}) {
  const [editName, setEditName] = React.useState(false);
  const [tankName, setTankName] = React.useState("My first tank :D");
  const [size, setSize] = React.useState(5);
  
  async function addCountry (){
    await supabase
    .from('tanks')
    .update({name: tankName}).eq('id', '2db389e9-352f-4cbc-9d27-3bbf3a903387')
    ;

}

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
            onSubmitEditing={addCountry}
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

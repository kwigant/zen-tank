import React from "react";
import { View, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getTank } from "@/api/tanks";
import { useQuery } from "react-query";
import { style } from "@/constants/Styles";
import Tabs from "@/components/Tabs";
import { Button, Text } from "react-native-paper";

export default function FishTankScreen() {
  // get context
    const [tab, setTab] = React.useState(0);
  
    const { id } = useLocalSearchParams();
    const {data: tank, isLoading } = useQuery({
        queryFn: () => getTank(id as string),
        queryKey: 'tankProfile'
      })
    
    return (
      <View style={{ backgroundColor: "#fff", paddingTop: 0, height: "100%" }}>
      <Image
        source={require('@/assets/images/full-tank.png')}
        resizeMode="cover"
        style={{ width: "100%", height: 250 }}
      />

      <View style={style.container}>
        <View style={style.justifiedRow}>
          <Text variant="headlineLarge" style={{ textAlign: "center" }}>
            {tank?.name}
          </Text>

     
        </View>
        <Tabs setTab={setTab} tab={tab} />
      </View>
      {/* <ScrollView>
        {tab === 0 ? (
          <AdditionalCare {...fish} />
        ) : tab === 1 ? (
          <BasicCare fish={fish} />
        ) : (
          <FishStats fish={fish} />
        )}
      </ScrollView> */}
           <Button
              onPress={() => router.push({pathname: '/(app)/fish-search', params: {tank_id: id}})}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Fish
          </Button>

          <Button
              onPress={() => router.push({pathname: '/(app)/plant-search', params: {tank_id: id}})}
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
              textColor="black"
            >
              Add Plants
          </Button>
    </View>
    );
  }

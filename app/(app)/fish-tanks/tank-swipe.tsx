import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import Swiper from "react-native-deck-swiper";
import { tank, TankFish } from "@/constants/Types";
import TankCard from "@/components/TankCard";
import { useAuth } from "@/hooks/Auth";
import { updateProfile } from "@/api/profile";
import { useProfile } from "@/hooks/Profile";

type TankSwipeProps = {
  tanks: tank[];
  tankIds: string[];
  tankFish: TankFish[];
};

import { LogBox } from "react-native";

export default function TankSwipe(props: TankSwipeProps) {
  const [_, setCurrentTank] = React.useState({} as tank);

  const ctx = useAuth();
  const ptx = useProfile();
  // silencing warning because the react-native-deck slider; see below for more details why
  LogBox.ignoreLogs(["Encountered two children with the same key"]);

  const { setProfile } = React.useContext(ptx);
  const { user } = React.useContext(ctx);
  
  function setCurrentTankItem(tank: tank) {
    // console.log("profile", profile);
    setCurrentTank(tank);
    if (user) {
      updateProfile({
        tanks: props.tanks.length,
        current_tank_id: tank.tank_id,
        current_tank_name: tank.name,
        current_tank_size: tank.size,
        current_tank_description: tank.description,
        current_tank_dgh: tank.tank_dgh,
        current_tank_temp: tank.tank_temp,
        user_id: user.id,
      })
        .then((data) => {
          // console.log("data", data);
          if (data) setProfile(data[0]);
        })
        .catch((error) => console.log(error));
    }
  }

  function getIndex(currentIdx: number) {
    if (currentIdx != props.tanks.length - 1) return currentIdx + 1;
    else return 0;
  }

  return (
    <View style={styles.container}>
      <Swiper
      containerStyle={{marginLeft: -24}}
        cards={props.tankIds}
        renderCard={(card, idx) => {
          return (
            <TankCard
              key={card}
              id={card}
              tank={props.tanks[idx]}
              fish={props.tankFish}
              addToList={true}
            />
          );
        }}
        cardIndex={0}
        disableLeftSwipe
        infinite
        disableRightSwipe
        onSwiped={(cardIndex) =>
          setCurrentTankItem(props.tanks[getIndex(cardIndex)])
        }
        
        backgroundColor="transparent"
        stackSize={props.tanks.length}
      ></Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: "auto",
    zIndex: 10,
    // display: 'flex', 
    // alignItems: 'center'
  },
});

/**
 * Because the swiper is set to infinite - i.e cards swiped away are put on the bottom of the stack -
 * while the card is being swiped, it is also being added to the bottom of the stack
 * 
 * the error is angry that while swiping there are technically two cards on the stack that have the 
 * same key but this is expected with the intended functionality so the error can be ignored
 *
 */
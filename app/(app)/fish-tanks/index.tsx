import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { tank, TankFish, TankPlants } from "@/constants/Types";
import uuid from "react-native-uuid";
import { createTank, deleteTank, listTanks } from "@/api/tanks";
import { useAuth } from "@/hooks/Auth";
import { useProfile } from "@/hooks/Profile";
import { updateProfile } from "@/api/profile";
import { Button } from "react-native-paper";
import { style } from "@/constants/Styles";
import TankSwipe from "./tank-swipe";
import TankForm from "@/components/TankForm";
import { useLocalSearchParams } from "expo-router";
import DeleteTankModal from "@/components/DeleteTankModal";
import TankCard from "@/components/TankCard";

export default function FishTankScreen() {
  // get context
  const ctx = useAuth();
  const profileCtx = useProfile();
  const { user } = React.useContext(ctx);
  const { profile, setProfile } = React.useContext(profileCtx);
  const { id } = useLocalSearchParams();
  // input state props
  const [tankName, setTankName] = React.useState("");
  const [size, setSize] = React.useState(5);
  const [tankIds, setTankIds] = useState([] as string[]);
  const [editMode, setEditMode] = useState(false);
  const [tankDesc, setTankDesc] = React.useState("");
  const [allTanks, setAllTanks] = React.useState([] as tank[]);
  const [allFishInTank, setFishInTank] = React.useState([] as TankFish[]);
  const [allPlantsInTank, setPlantsInTank] = React.useState([] as TankPlants[]);
  const [startingCardIdx, setStartingCardIdx] = React.useState(0);
  const [currentTank, setCurrentTank] = React.useState({} as tank);
  // create modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // delete modal props
  const [dvisible, setDVisible] = React.useState(false);
  const showDModal = () => setDVisible(true);
  const hideDModal = () => setDVisible(false);

  // useEffect(() => {
  //   if (user) {
  //     listTanks(user.id)
  //       .then((items) => {
  //         if (items) {
  //           setAllTanks(items);
  //           setTankIds(
  //             items.map((i) => {
  //               return i.tank_id;
  //             })
  //           );
           
  //         }
  //       })
  //       .catch((error: Error) => {
  //         throw error;
  //       });
      
  //   }
  // }, []);

  function createTankAndUpdate() {
    if (user) {
      const tank_id = uuid.v4().toString();

      createTank({
        name: tankName,
        size: size,
        user_id: user.id,
        tank_id: tank_id,
        tank_dgh: '',
        tank_temp: '',
        tank_pH: '',
        description: tankDesc,
      })
        .then((data) => {
          if (data) {
            setCurrentTank(data[0] as tank);
            setAllTanks([data[0] as tank, ...allTanks]);
            setTankIds([tank_id, ...tankIds]);
          }
          hideModal();
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          updateProfile({
            tanks: allTanks.length + 1,
            current_tank_id: tank_id,
            current_tank_name: tankName,
            current_tank_size: size,
            current_tank_description: tankDesc,
            current_tank_dgh: '',
            current_tank_temp: '',
            current_tank_ph: '',

            user_id: user.id,
          }).then((data) => {
            if (data) setProfile(data[0]);
          });
        });

      listTanks(user.id);
    }
  }

  function setCurrentTankItem(tank: tank) {
    setCurrentTank(tank);
    if (user) {
      updateProfile({
        tanks: allTanks.length,
        current_tank_id: tank.tank_id,
        current_tank_name: tank.name,
        current_tank_size: tank.size,
        current_tank_description: tank.description,
        current_tank_dgh: tank.tank_dgh,
        current_tank_temp: tank.tank_temp,
        current_tank_ph: tank.tank_pH,
        user_id: user.id,
      })
        .then((data) => {
         
          // if (data) setProfile(data[0]);
        })
        .catch((error) => console.error(error));
    }
  }

  // put the current tank at the start of swiper
  // setting start index on react-native-deck-swiper is unreliable on first load
  function putCurrentOnTop() {
    let currentIndex = allTanks.findIndex(t => t.tank_id === id)
    let currentObj = allTanks.splice(currentIndex, 1)[0]
    allTanks.unshift(currentObj)
    return allTanks
  }

  function deleteTankAndUpdate() {
    if (user) {
     

      const index = allTanks.length - 1 === 1 ? 1 : 0;
      if (profile) {
        deleteTank(profile.current_tank_id)
        .then(() => {
          setCurrentTank(allTanks[0])
         
        })
        .catch((error) => {
        
          throw error;
        }).finally(() =>
          updateProfile({
            tanks: allTanks.length - 1,
            current_tank_id: allTanks[index].tank_id,
            current_tank_name: allTanks[index].name,
            current_tank_size: allTanks[index].size,
            current_tank_description: allTanks[index].description,
            current_tank_dgh: allTanks[index].tank_dgh,
            current_tank_temp: allTanks[index].tank_temp,
            current_tank_ph: allTanks[index].tank_pH,
            user_id: user.id,
          }).then((data) => {
            if (data) setProfile(data[0]);
          }) )          
        }
          
       
        hideDModal()
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%", padding: 24 }}>
      <TankForm
        visible={visible}
        hideModal={hideModal}
        setSize={setSize}
        size={size}
        tankDesc={tankDesc}
        setTankDesc={setTankDesc}
        tankName={tankName}
        setTankName={setTankName}
        edit={false}
        onPress={createTankAndUpdate}
      />
      <DeleteTankModal
        visible={dvisible}
        hideModal={hideDModal}
        delete={deleteTankAndUpdate}
      />
      <View style={{minHeight: "50%", flex: 1}}>
       { allTanks.length > 1 ? <TankSwipe
          tanks={putCurrentOnTop()}
          tankIds={tankIds}
          tankFish={allFishInTank}
        /> : profile && <TankCard id={profile?.current_tank_id} tank={allTanks[0]} fish={[]} addToList={true}/>}
      </View>

      <View
        style={{
          flex: 1,
          zIndex: 10,
          // justifyContent: "flex-end",
          marginTop: 40,
       
        }}
      >
         <Button
          style={[style.iconBtn, { padding: 2, minWidth: null }]}
          textColor="black"
          onPress={() => showModal()}
        >
          Add a Tank
        </Button>
        <View style={[style.row]}>
          <Button
            style={[style.iconBtn, { padding: 2, flexGrow: 1, minWidth: null }]}
            textColor="black"
          >
            Edit Tank
          </Button>
          <Button
            style={[style.iconBtn, { padding: 2, flexGrow: 1, minWidth: null }]}
            textColor="black"
            onPress={() => showDModal()}
          >
            Delete Tank
          </Button>
        </View>
       
      </View>
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import {
  Text,
  IconButton,
  Button,
  Icon,
  Chip,
  Menu,
  Divider,
} from "react-native-paper";
import { style } from "@/constants/Styles";
import { tank, TankFish } from "@/constants/Types";
import uuid from "react-native-uuid";
import { router } from "expo-router";
import TankItem from "@/components/TankItems";
import TankForm from "@/components/TankForm";
import { createTank, deleteTank, listTanks } from "@/api/tanks";
import { useAuth } from "@/hooks/Auth";
import Accordion, { AccordionInput } from "@/components/Accordion";
import { useProfile } from "@/hooks/Profile";
import { updateProfile } from "@/api/profile";
import { getFishInTank } from "@/api/fish";
import GridItem from "@/components/GridItem";

export default function FishTankScreen() {
  // get context
  const ctx = useAuth();
  const profileCtx = useProfile();
  const { user } = React.useContext(ctx);
  const { profile, setProfile } = React.useContext(profileCtx);
  // input state props
  const [tankName, setTankName] = React.useState("");
  const [size, setSize] = React.useState(5);
  const [editMode, setEditMode] = useState(false);
  const [allTanks, setAllTanks] = React.useState([] as tank[]);
  const [allFishInTank, setFishInTank] = React.useState([] as TankFish[]);
  const [currentTank, setCurrentTank] = React.useState({} as tank);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // accordion props
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(true);
  const [sThree, setsThree] = useState(false);

  // menu props
  const [mVisible, setMVisible] = React.useState(false);
  const openMenu = () => setMVisible(true);
  const closeMenu = () => setMVisible(false);

  useEffect(() => {
    if (user) {
      listTanks(user.id)
        .then((items) => {
          if (items) {
            setAllTanks(items);
          }
        })
        .catch((error: Error) => {
          throw error;
        });
    }
    if (profile) {
      getFishInTank(profile.current_tank_id)
        .then((data) => setFishInTank(data as TankFish[]))
        .catch((error) => {
          throw error;
        });
    }
  }, [allTanks]);

  function createTankAndUpdate() {
    if (user) {
      const tank_id = uuid.v4().toString();
      createTank({
        name: tankName,
        size: size,
        user_id: user.id,
        tank_id: tank_id,
      })
        .then((data) => {
          if (data) setCurrentTank(data[0] as tank);
          hideModal();
        })
        .catch((error) => {
          throw error;
        })
        .finally(() =>
          updateProfile({
            tanks: allTanks.length + 1,
            current_tank_id: tank_id,
            current_tank_name: tankName,
            current_tank_size: size,
            user_id: user.id,
          }).then((data) => {
            if (data) setProfile(data[0]);
          })
        );

      listTanks(user.id);
    }
  }

  function deleteTankAndUpdate(tank_id: string) {
    if (user) {
      const index = allTanks.length - 1 === 1 ? 1 : 0;
      deleteTank(tank_id)
        .then(() => setCurrentTank(allTanks[0]))
        .catch((error) => {
          throw error;
        })
        .finally(() =>
          updateProfile({
            tanks: allTanks.length - 1,
            current_tank_id: allTanks[index].tank_id,
            current_tank_name: allTanks[index].name,
            current_tank_size: allTanks[index].size,
            user_id: user.id,
          }).then((data) => {
            if (data) setProfile(data[0]);
          })
        );
    }
  }

  function menuNavigation(path: string) {
    if (path === "/fish-search" || path === "/plant-search")
      router.navigate(path);
    closeMenu();
  }

  function setCurrentTankItem(tank: tank) {
    setCurrentTank(tank);
    if (user) {
      updateProfile({
        tanks: allTanks.length,
        current_tank_id: tank.tank_id,
        current_tank_name: tank.name,
        current_tank_size: tank.size,
        user_id: user.id,
      }).then((data) => {
        if (data) setProfile(data[0]);
      });
    }
  }

  const accordionArray: AccordionInput[] = [
    {
      expanded: sOne,
      onPress: setsOne,
      title: "Fish",
      children: <FlatList
        data={allFishInTank}
        renderItem={({item}) => <GridItem item={item} isFish={true}/>}
      />,
    },
    {
      expanded: sTwo,
      onPress: setsTwo,
      title: "Plants",
      children: <Text>test</Text>,
    },
    {
      expanded: sThree,
      onPress: setsThree,
      title: "All Tanks",
      children: (
        <FlatList
          ListHeaderComponent={
            <Text style={{ marginBottom: 16 }}>
              You have {allTanks.length} tanks
            </Text>
          }
          ListFooterComponent={
            <Button
              style={{ marginTop: 16 }}
              icon={"plus"}
              mode="contained"
              onPress={() => {
                setEditMode(false);
                showModal();
              }}
            >
              Create a Tank
            </Button>
          }
          style={{ paddingHorizontal: 12 }}
          data={allTanks}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setCurrentTankItem(item)}>
              <TankItem tank={item} />
            </TouchableOpacity>
          )}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 24,
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <View style={[style.justifiedRow, { marginHorizontal: 12 }]}>
        <Text variant={"headlineLarge"}>Current Tank</Text>
        <Menu
          visible={mVisible}
          onDismiss={closeMenu}
          style={{ margin: 24 }}
          contentStyle={{ margin: 24 }}
          anchor={<IconButton icon={"dots-horizontal"} onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              setEditMode(true);
              closeMenu();
              showModal();
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => deleteTankAndUpdate(currentTank.tank_id)}
            title="Delete"
          />
          <Divider />
          <Menu.Item
            onPress={() => menuNavigation("/fish-search")}
            title="Add Fish"
          />
          <Menu.Item
            onPress={() => menuNavigation("/plant-search")}
            title="Add Plants"
          />
        </Menu>
      </View>

      <View style={[style.row, { margin: 16 }]}>
        <Icon source="cube" size={60} />

        <View style={{ marginLeft: 24 }}>
          <Text variant="headlineMedium"> {profile?.current_tank_name}</Text>
          <View style={[style.justifiedRow, { marginTop: 12, width: "80%" }]}>
            <Chip style={{ marginRight: 8, width: 100 }}>
              {profile?.current_tank_size} Gallons
            </Chip>
          </View>
        </View>
      </View>
      <Accordion input={accordionArray} />

      <TankForm
        edit={editMode}
        visible={visible}
        size={size}
        setSize={setSize}
        hideModal={hideModal}
        tankName={tankName}
        setTankName={setTankName}
        onPress={() => createTankAndUpdate()}
      />
    </View>
  );
}

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
import { tank } from "@/constants/Types";
import uuid from "react-native-uuid";
import { router } from "expo-router";
import TankItem from "@/components/TankItems";
import TankForm from "@/components/TankForm";
import { createTank, deleteTank, listTanks } from "@/api/tanks";
import { useAuth } from "@/hooks/Auth";
import Accordion, { AccordionInput } from "@/components/Accordion";
import { useProfile } from "@/hooks/Profile";
import { updateProfile } from "@/api/profile";

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
  const [currentTank, setCurrentTank] = React.useState({} as tank);
  // modal props
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // accordion props
  const [sOne, setsOne] = useState(false);
  const [sTwo, setsTwo] = useState(false);
  const [sThree, setsThree] = useState(true);

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
      deleteTank(tank_id)
        .then(() => setCurrentTank(allTanks[0]))
        .catch((error) => {
          throw error;
        })
        .finally(() =>
          updateProfile({
            tanks: allTanks.length - 1,
            current_tank_id: allTanks[0].tank_id,
            current_tank_name: allTanks[0].name,
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
      children: <Text>{profile?.first_name}</Text>,
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
              <TankItem setCurrentTank={setCurrentTank} tank={item} />
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
        <Text variant={"headlineLarge"}>Current Tank: {profile?.tanks}</Text>
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
          <Text variant="headlineMedium"> {currentTank.name}</Text>
          <View style={[style.justifiedRow, { marginTop: 12, width: "80%" }]}>
            <Chip style={{ marginRight: 8 }}>
              Size: {profile?.current_tank_size}
            </Chip>
            <Chip style={{ marginRight: 8 }}>Fish: 0</Chip>
            <Chip style={{ marginRight: 4 }}>Plants: 0</Chip>
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

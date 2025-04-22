import { Stack } from 'expo-router';
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const TankRoute = () =>      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="fish-search/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "Add some fish!",
            headerTitleStyle: {
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="fish-search/[id]"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        <Stack.Screen
          name="fish-tanks/index"
          options={{
            headerShadowVisible: false,
            headerShown: true,
            title: "",
          }}
        />
        <Stack.Screen
          name="plant-search/index"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "Add some plants!",
            headerTitleStyle: {
              fontFamily: "Poppins",
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="plant-search/[id]"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: "",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>

const SearchRoute = () => <Text>Albums</Text>;

const TasksRoute = () => <Text>Recents</Text>;

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tanks', title: 'Tanks', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'search', title: 'Search', focusedIcon: 'magnify' },
    { key: 'tasks', title: 'Tasks', focusedIcon: 'logs' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    tanks: TankRoute,
    search: SearchRoute,
    tasks: TasksRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
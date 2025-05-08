import { style } from "@/constants/Styles";
import { tank } from "@/constants/Types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, List, Text, useTheme } from "react-native-paper";

export default function TankAccordion(tank: tank) {
  const [sOne, setsOne] = useState(false);
  const [sTwo, setsTwo] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  return (
    <List.Section style={{ margin: 0, paddingTop: 0 }}>
      <List.Accordion
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        title={<Text variant="headlineSmall">General Info</Text>}
        expanded={sOne}
        onPress={() => setsOne(!sOne)}
      >
        <View style={{ marginBottom: 24 }}>
          <Text variant="bodyMedium">Temp:{tank.temp}</Text>
          <Text variant="bodyMedium">Substrates:{tank.substrates}</Text>

          <Button
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/tanks/maintenance-logs",
                params: { tank_id: tank.tank_id },
              })
            }
          >
            View Maintenance Logs
          </Button>
        </View>
      </List.Accordion>

      <List.Accordion
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        title={<Text variant="headlineSmall">Reminders</Text>}
        expanded={sTwo}
        onPress={() => setsTwo(!sTwo)}
      >
        <View style={{ marginBottom: 24 }}>
          <Text variant="bodyMedium">Latest Task</Text>

          <Text variant="bodyMedium">Next Task</Text>
          <Button
            onPress={() => router.push("/tools/tasks")}
            style={[style.iconBtn, { padding: 2, minWidth: null }]}
            textColor="black"
          >
            View Tank Tasks
          </Button>
        </View>
      </List.Accordion>
    </List.Section>
  );
}

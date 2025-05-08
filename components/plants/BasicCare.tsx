import { style } from "@/constants/Styles";
import { plant } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text, useTheme } from "react-native-paper";

export type GridProps = { plant: plant };

export default function BasicCare({ plant }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(true);
  const [sThree, setsThree] = useState(true);
  const theme = useTheme();
  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        title={
          <Text
            variant="headlineSmall"
            style={{ padding: 4, marginHorizontal: 10 }}
          >
            Lighting Conditions
          </Text>
        }
        expanded={sOne}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium">{plant.lighting}</Text>
      </List.Accordion>

      <List.Accordion
        title={<Text variant="headlineSmall">Fertilization Instructions</Text>}
        expanded={sTwo}
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        onPress={() => setsTwo(!sTwo)}
      >
        <Text variant="bodyMedium">{plant.fertilization}</Text>
      </List.Accordion>

      <List.Accordion
        title={<Text variant="headlineSmall">Other Maintenance</Text>}
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        expanded={sThree}
        onPress={() => setsThree(!sThree)}
      >
        <Text variant="bodyMedium">{plant.maintenance}</Text>
      </List.Accordion>
    </List.Section>
  );
}

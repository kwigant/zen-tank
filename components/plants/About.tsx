import { plant } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text, useTheme } from "react-native-paper";

export type GridProps = { plant: plant };

export default function BasicCare({ plant }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(true);
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
            General Info
          </Text>
        }
        expanded={sOne}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium">{plant.look}</Text>

        <Text variant="bodyMedium">{`Texture: ${plant.texture}`}</Text>

        <Text variant="bodyMedium">{`Growth Rate: ${plant.growth_rate}`}</Text>
      </List.Accordion>

      <List.Accordion
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        title={<Text variant="headlineSmall">Ideal Water Chemistry</Text>}
        expanded={sTwo}
        onPress={() => setsTwo(!sTwo)}
      >
        <Text variant="bodyMedium">{`Temperature: ${plant.temperature}`}</Text>

        <Text variant="bodyMedium">{`pH Level: ${plant.ph}`}</Text>

        <Text variant="bodyMedium">{`Hardness: ${plant.hardness}`}</Text>
      </List.Accordion>
    </List.Section>
  );
}

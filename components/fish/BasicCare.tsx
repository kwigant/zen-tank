import { style } from "@/constants/Styles";
import { fish } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text, useTheme } from "react-native-paper";

export type GridProps = { fish: fish };

export default function BasicCare({ fish }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(false);
  const [sThree, setsThree] = useState(false);
const theme = useTheme()
  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
       style={{
                backgroundColor: theme.colors.surfaceVariant,
                borderRadius: 8,
                marginBottom: 16,
              }}
        title={
          <Text variant="headlineSmall" style={{ padding: 4, marginHorizontal: 10 }}>
            {`Optimum Tank Conditions`}{" "}
          </Text>
        }
        expanded={sOne}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium" >
          {`Minimum Tank Size: ${fish.tankSize}`}{" "}
        </Text>
        <Text variant="bodyMedium">
          {`Water Temperature: ${fish.waterTemperature}`}{" "}
        </Text>
        <Text variant="bodyMedium" >
          {`Hardness: ${fish.hardness}`}{" "}
        </Text>
        <Text variant="bodyMedium">
          {`pH: ${fish.pH}`}{" "}
        </Text>
        <Text variant="bodyMedium">
          {`Ideal Number: ${fish.preferredNumber}`}{" "}
        </Text>
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" >
            {`Substrates`}
          </Text>
        }
        expanded={sTwo}
         style={{
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
        onPress={() => setsTwo(!sTwo)}
      >
      
        <Text variant="bodyMedium">
          {fish.idealSubstrates}
        </Text>
       
        <Text variant="bodyMedium" >
          {`Ideal Tank Setup: ${fish.preferredNumber}`}{" "}
        </Text>
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" >
            {`Special Equipment`}
          </Text>
        }
        expanded={sThree}
         style={{
                  backgroundColor: theme.colors.surfaceVariant,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
        onPress={() => setsThree(!sThree)}
      >
       
            <Text  >
              {fish.specialEquipment}
            </Text>
       
      </List.Accordion>
    </List.Section>
  );
}

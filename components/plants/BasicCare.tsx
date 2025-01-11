import { style } from "@/constants/Styles";
import { plant } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text } from "react-native-paper";

export type GridProps = { plant: plant };

export default function BasicCare({ plant }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(true);
  const [sThree, setsThree] = useState(true);
  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
        title={
          <Text variant="headlineSmall" style={{ padding: 4, marginHorizontal: 10 }}>
           Lighting Conditions
          </Text>
        }
        expanded={sOne}
        style={style.accordionBackground}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium" style={style.accordionListText}>
         {plant.lighting}
        </Text>
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" style={style.accordionListText}>
            Fertilization Instructions
          </Text>
        }
        expanded={sTwo}
        style={style.accordionBackground}
        onPress={() => setsTwo(!sTwo)}
      >
      
        <Text style={style.accordionListText} variant="bodyMedium">
        {plant.fertilization}
        </Text>
       
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" style={style.accordionListText}>
            Other Maintenance
          </Text>
        }
        expanded={sThree}
        style={style.accordionBackground}
        onPress={() => setsThree(!sThree)}
      >
      
        <Text style={style.accordionListText} variant="bodyMedium">
        {plant.maintenance}
        </Text>
       
      </List.Accordion>
    </List.Section>
  );
}

import { style } from "@/constants/Styles";
import { plant } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text } from "react-native-paper";

export type GridProps = { plant: plant };

export default function BasicCare({ plant }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(true);

  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
        title={
          <Text variant="headlineSmall" style={{ padding: 4, marginHorizontal: 10 }}>
           General Info
          </Text>
        }
        expanded={sOne}
        style={style.accordionBackground}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium" style={style.accordionListText}>
         {plant.look}
        </Text>
     
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Texture: ${plant.texture}`}
        </Text>

        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Growth Rate: ${plant.growth_rate}`}
        </Text>
    
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" style={style.accordionListText}>
            Ideal Water Chemistry
          </Text>
        }
        expanded={sTwo}
        style={style.accordionBackground}
        onPress={() => setsTwo(!sTwo)}
      >
      
        <Text style={style.accordionListText} variant="bodyMedium">
        {`Temperature: ${plant.temperature}`}
        </Text>
       
        <Text style={style.accordionListText} variant="bodyMedium">
        {`pH Level: ${plant.ph}`}
        </Text>

        <Text style={style.accordionListText} variant="bodyMedium">
        {`Hardness: ${plant.hardness}`}
        </Text>
      </List.Accordion>
    </List.Section>
  );
}

import { style } from "@/constants/Styles";
import { fish } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text } from "react-native-paper";

export type GridProps = { fish: fish };

export default function BasicCare({ fish }: GridProps) {
  const [sOne, setsOne] = useState(true);
  const [sTwo, setsTwo] = useState(false);
  const [sThree, setsThree] = useState(false);
  console.log(fish.specialEquipment)

  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
        title={
          <Text variant="headlineSmall" style={{ padding: 4, marginHorizontal: 10 }}>
            {`Optimum Tank Conditions`}{" "}
          </Text>
        }
        expanded={sOne}
        style={{ backgroundColor: "white" }}
        onPress={() => setsOne(!sOne)}
      >
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Minimum Tank Size: ${fish.tankSize}`}{" "}
        </Text>
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Water Temperature: ${fish.waterTemperature}`}{" "}
        </Text>
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Hardness: ${fish.hardness}`}{" "}
        </Text>
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`pH: ${fish.pH}`}{" "}
        </Text>
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Ideal Number: ${fish.preferredNumber}`}{" "}
        </Text>
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" style={style.accordionListText}>
            {`Substrates`}
          </Text>
        }
        expanded={sTwo}
        style={{ backgroundColor: "white" }}
        onPress={() => setsTwo(!sTwo)}
      >
      
        <Text style={style.accordionListText} variant="bodyMedium">
          {fish.idealSubstrates}
        </Text>
       
        <Text variant="bodyMedium" style={style.accordionListText}>
          {`Ideal Tank Setup: ${fish.preferredNumber}`}{" "}
        </Text>
      </List.Accordion>

      <List.Accordion
        title={
          <Text variant="headlineSmall" style={style.accordionListText}>
            {`Special Equipment`}
          </Text>
        }
        expanded={sThree}
        style={{ backgroundColor: "white" }}
        onPress={() => setsThree(!sThree)}
      >
       
            <Text style={style.accordionListText} >
              {fish.specialEquipment}
            </Text>
       
      </List.Accordion>
    </List.Section>
  );
}

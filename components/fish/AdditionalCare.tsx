import { style } from "@/constants/Global";
import { fish } from "@/constants/Types";
import React, { useState } from "react";
import { View } from "react-native";
import { Icon, List, Text } from "react-native-paper";

export type GridProps = { fish: fish };

export default function AdditionalCare({ fish }: GridProps) {
  const [s1, sets1] = useState(true);
  const [s2, sets2] = useState(false);
  const [s3, sets3] = useState(false);
  return (
    <List.Section style={{ margin: 0, padding: 24, paddingTop: 0 }}>
      <List.Accordion
        title={
          <Text variant="bodyBold" style={{ padding: 4, marginHorizontal: 10 }}>
            {`General Info`}
          </Text>
        }
        expanded={s1}
        style={{ backgroundColor: "white" }}
        onPress={() => sets1(!s1)}
      >
        <Text variant="body" style={style.accordionListText}>
          {fish.typicalBehavior}
        </Text>

        <Text variant="body" style={style.accordionListText}>
          {`Life Span: ${fish.lifespan}`}
        </Text>
        <Text variant="body" style={style.accordionListText}>
          {`Care Difficulty: ${fish.careLevel}`}
        </Text>
        <Text variant="body" style={style.accordionListText}>
          {`Size at Maturity: ${fish.sizeAtMaturity}`}
        </Text>
        <Text variant="body" style={style.accordionListText}>
          {`Temperament: ${fish.temperament}`}
        </Text>
      </List.Accordion>
      <List.Accordion
        title={
          <Text variant="bodyBold" style={{ padding: 4, marginHorizontal: 10 }}>
            {`Feeding Habits`}
          </Text>
        }
        expanded={s2}
        style={{ backgroundColor: "white" }}
        onPress={() => sets2(!s2)}
      >
        <Text variant="body" style={style.accordionListText}>
          {fish.feedingHabits}
        </Text>
        
           
            <Text style={style.accordionListText} variant="body">
              {fish.diet}
            </Text>
          
        
      </List.Accordion>
      <List.Accordion
        title={
          <Text variant="bodyBold" style={{ padding: 4, marginHorizontal: 10 }}>
            {`Breeding Habits`}
          </Text>
        }
        expanded={s3}
        style={{ backgroundColor: "white" }}
        onPress={() => sets3(!s3)}
      >
         <Text variant="body" style={style.accordionListText}>
          {fish.breedingFrequency}
        </Text>
        <Text variant="body" style={style.accordionListText}>
          {fish.fryCount}
        </Text> 
      </List.Accordion>
    </List.Section>
  );
}

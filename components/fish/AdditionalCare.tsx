import { fish } from "@/constants/Types";
import React, { useState } from "react";
import { List, Text, useTheme } from "react-native-paper";

export type GridProps = { fish: fish };

export default function AdditionalCare({ fish }: GridProps) {
  const [s1, sets1] = useState(true);
  const [s2, sets2] = useState(false);
  const [s3, sets3] = useState(false);
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
        expanded={s1}
        onPress={() => sets1(!s1)}
      >
        <Text variant="bodyMedium">{fish.typicalBehavior}</Text>

        <Text variant="bodyMedium">{`Life Span: ${fish.lifespan}`}</Text>
        <Text variant="bodyMedium">{`Care Difficulty: ${fish.careLevel}`}</Text>
        <Text variant="bodyMedium">
          {`Size at Maturity: ${fish.sizeAtMaturity}`}
        </Text>
        <Text variant="bodyMedium">{`Temperament: ${fish.temperament}`}</Text>
      </List.Accordion>
      <List.Accordion
        title={
          <Text
            variant="headlineSmall"
            style={{ padding: 4, marginHorizontal: 10 }}
          >
            {`Feeding Habits`}
          </Text>
        }
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        expanded={s2}
        onPress={() => sets2(!s2)}
      >
        <Text variant="bodyMedium">{fish.feedingHabits}</Text>

        <Text variant="bodyMedium">{fish.diet}</Text>
      </List.Accordion>
      <List.Accordion
        title={
          <Text
            variant="headlineSmall"
            style={{ padding: 4, marginHorizontal: 10 }}
          >
            {`Breeding Habits`}
          </Text>
        }
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 8,
          marginBottom: 16,
        }}
        expanded={s3}
        onPress={() => sets3(!s3)}
      >
        <Text variant="bodyMedium">{fish.breedingFrequency}</Text>
        <Text variant="bodyMedium">{fish.fryCount}</Text>
      </List.Accordion>
    </List.Section>
  );
}

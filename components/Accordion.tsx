import { Dispatch, SetStateAction } from "react";
import { List, Text } from "react-native-paper";

export type AccordionInput = {
  title: string;
  expanded: boolean;
  onPress: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};
type ArrayInput = { input: AccordionInput[]}

export default function Accordion(input: ArrayInput) {
  return (
    <List.Section style={{ width: "100%" }}>
      {input.input.map((i, index) => {
        return (
          <List.Accordion
            key={index}
            title={
              <Text variant="headlineSmall" style={{ width: "100%" }}>
                {i.title}
              </Text>
            }
            expanded={i.expanded}
            style={{ backgroundColor: "white" }}
            onPress={() => i.onPress(!i.expanded)}
          >
            {i.children}
          </List.Accordion>
        );
      })}
    </List.Section>
  );
}

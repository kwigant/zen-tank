import { Logs, Tasks } from "@/constants/Types";
import { Card, Checkbox, Icon, Text, useTheme } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction, useState } from "react";
type LogProps = {
  log: Logs;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setEVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedTask: Dispatch<SetStateAction<Logs>>;
  selectedLog: Logs;
};
export default function Log(props: LogProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => props.setSelectedTask(props.log)}
      style={{
        borderBottomColor: theme.colors.surfaceVariant,
        borderBottomWidth: 2,
        padding: 12,
      }}
    >
      <View style={style.justifiedRow}>
        <View style={style.row}>
          <Text style={{color: theme.colors.outline, marginRight: 8}}>{props.log.date_added}</Text>
          <Text variant="headlineSmall" style={{marginRight: 4}}>{props.log.title}</Text>
          <Text style={{ wordWrap: "wrap" }}>{props.log.description}</Text>
        </View>

        {props.selectedLog === props.log && (
          <View style={[style.row]}>
            <TouchableOpacity onPress={() => props.setVisible(true)}>
              <Icon source="delete-outline" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.setEVisible(true)}>
              <Icon source="pencil" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

import { Tasks } from "@/constants/Types";
import {Card, Checkbox, Icon, Text, useTheme} from "react-native-paper"
import {TouchableOpacity, View} from "react-native";
import { style } from "@/constants/Styles";
import { Dispatch, SetStateAction, useState } from "react";
type TaskProps = {
    task: Tasks,
    setVisible: Dispatch<SetStateAction<boolean>>,
    setEVisible: Dispatch<SetStateAction<boolean>>,
    setSelectedTask: Dispatch<SetStateAction<Tasks>>, 
    selectedTask: Tasks
}
export default function Task(props: TaskProps) {
    const theme= useTheme()
    const [checked, setChecked] = useState(props.task.checked);
   
    return (
        <Card onPress={()=>props.setSelectedTask(props.task)} style={{marginHorizontal: 12, marginVertical: 6, padding: 12}}>
            <View style={style.justifiedRow}>
                <View style={style.row}>
                    <View style={{marginRight: 12, borderWidth: 1, borderColor: theme.colors.backdrop, borderRadius: 25}}>
                        <Checkbox
                              status={checked ? 'checked' : 'unchecked'}
                              onPress={() => {
                                setChecked(!checked);
                              }}
                            />
                    </View>
                    <View style={style.column}>
                        <Text>{props.task.name}</Text>
                        <Text>{props.task.description}</Text>
                    </View>
                </View>

               { props.selectedTask === props.task && <View style={[style.row]}>
                   <TouchableOpacity onPress={()=>props.setVisible(true)}>
                        <Icon source="delete-outline" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.setEVisible(true)}>
                        <Icon source="pencil" size={24} />
                    </TouchableOpacity>
               </View>}
            </View>

        </Card>
    )
}
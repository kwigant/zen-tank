import { listTanks } from "@/api/tanks";
import { listTasks } from "@/api/tasks";
import NewTaskModal from "@/components/tools/AddTaskModal";
import DeleteTaskModal from "@/components/tools/DeleteTaskModal";
import EditTaskModal from "@/components/tools/EditTaskModal";
import Task from "@/components/tools/Task";
import { style } from "@/constants/Styles";
import { Tasks } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import { useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { Option } from "react-native-paper-dropdown";
import { useQuery } from "react-query";

export default function ToolsScreen() {
  const theme = useTheme();
  const ctx = useAuth();
  const { user } = useContext(ctx);
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [dvisible, setDVisible] = useState(false);
  const hideDModal = () => setDVisible(false);
  const [evisible, setEVisible] = useState(false);
  const hideEModal = () => setEVisible(false);

  const [selectedTask, setSelectedTask] = useState({} as Tasks);

  let options = new Array<Option>();

  if (user) {
    const { data: allTasks, isLoading } = useQuery({
      queryKey: "taskList",
      queryFn: () => listTasks(user.id),
    });
    const { data: allTanks } = useQuery({
      queryKey: "tankList",
      queryFn: () => listTanks(user.id),
    });
    allTanks?.map((t) => options.push({ label: t.name, value: t.tank_id }));

    if (isLoading) return <Text>Loading...</Text>;

    return (
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: 0,
          height: "100%",
        }}
      >
        <Button
          onPress={() => setVisible(true)}
          style={[style.iconBtn, { padding: 2, minWidth: null }]}
          textColor="black"
        >
          Add a Task
        </Button>

        <NewTaskModal visible={visible} hideModal={hideModal} />
        <FlatList
          data={options}
          contentContainerStyle={{ marginTop: 24 }}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.label}</Text>
                <FlatList
                  data={allTasks?.filter(t => t.tank_id === item.value)}
                  contentContainerStyle={{ marginTop: 24 }}
                  renderItem={({ item }) => {
                    return (
                      <Task
                        task={item}
                        setVisible={setDVisible}
                        setEVisible={setEVisible}
                        setSelectedTask={setSelectedTask}
                        selectedTask={selectedTask}
                      ></Task>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.label}
        />

        <DeleteTaskModal
          visible={dvisible}
          hideModal={hideDModal}
          task={selectedTask}
        />
        <EditTaskModal
          visible={evisible}
          hideModal={hideEModal}
          task={selectedTask}
        />
      </View>
    );
  }
}

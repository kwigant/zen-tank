import { listLogs } from "@/api/logs";
import { listTanks } from "@/api/tanks";
import { listTasks } from "@/api/tasks";
import Loading from "@/components/layouts/Loading";
import DeleteLogModal from "@/components/logs/DeleteLogModal";
import EditLogModal from "@/components/logs/EditLogModal";
import Log from "@/components/logs/Log";
import NewLogModal from "@/components/logs/NewLogModal";
import NewTaskModal from "@/components/tools/AddTaskModal";
import DeleteTaskModal from "@/components/tools/DeleteTaskModal";
import EditTaskModal from "@/components/tools/EditTaskModal";
import Task from "@/components/tools/Task";
import { style } from "@/constants/Styles";
import { Logs, Tasks } from "@/constants/Types";
import { useAuth } from "@/hooks/Auth";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { useTheme, Text, Button } from "react-native-paper";
import { Option } from "react-native-paper-dropdown";
import { useQuery } from "react-query";

export default function MaintenanceLogsScreen() {
  const { tank_id } = useLocalSearchParams();
  const theme = useTheme();
  const ctx = useAuth();
  const { user } = useContext(ctx);
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const [dvisible, setDVisible] = useState(false);
  const hideDModal = () => setDVisible(false);
  const [evisible, setEVisible] = useState(false);
  const hideEModal = () => setEVisible(false);

  const [selectedLog, setSelectedLog] = useState({} as Logs);

  let options = new Array<Option>();

  if (user) {
    const { data: logs, isLoading } = useQuery({
      queryKey: "logList",
      queryFn: () => listLogs(tank_id.toString()),
    });

    if (isLoading) return <Loading />;

    return (
      <View
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: 0,
          height: "100%",
        }}
      >
        <View
          style={[
            style.justifiedRow,
            { paddingHorizontal: 24, paddingTop: 12 },
          ]}
        >
          <Text variant="headlineLarge">Maintenance Log</Text>
        </View>

        <NewLogModal
          visible={visible}
          hideModal={hideModal}
          tank_id={tank_id.toString()}
        />
        <FlatList
          data={logs}
          ListFooterComponent={
            <Button
              onPress={() => setVisible(true)}
              textColor="black"
              style={[style.iconBtn, { padding: 2, minWidth: null }]}
            >
              Create New Log
            </Button>
          }
          contentContainerStyle={{ marginHorizontal: 18 }}
          renderItem={({ item }) => {
            return (
              <Log
                log={item}
                setVisible={setDVisible}
                setEVisible={setEVisible}
                setSelectedTask={setSelectedLog}
                selectedLog={selectedLog}
              ></Log>
            );
          }}
        />

        <DeleteLogModal
          visible={dvisible}
          hideModal={hideDModal}
          log={selectedLog}
        />
        <EditLogModal
          visible={evisible}
          hideModal={hideEModal}
          log={selectedLog}
        />
      </View>
    );
  }
}

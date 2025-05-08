import { style } from "@/constants/Styles";
import { RelativePathString, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

export default function ToolsScreen() {
  const theme = useTheme();
  const tools = [
    {
      id: 0,
      title: "Tank Tasks",
      path: "/(tabs)/tools/tasks",
      icon: "format-list-checkbox",
    },
    // {
    //   id: 1,
    //   title: "Substrate Calculator",
    //   path: "/(tabs)/tools/substrate-calculator",
    //   icon: "calculator",
    // },
    {
      id: 2,
      title: "Starter Tanks",
      path: "/(tabs)/tools/starter-tanks",
      icon: "cube",
    },
  ];
  return (
    <View
      style={[
        style.background,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text
        style={{ textAlign: "center", marginBottom: 24 }}
        variant="headlineLarge"
      >
        Tools
      </Text>
      {tools.map((t) => {
        return (
          <TouchableOpacity
            key={t.id}
            style={{ marginBottom: 18 }}
            onPress={() => router.push(t.path as RelativePathString)}
          >
            <View
              style={{
                borderRadius: 8,
                padding: 12,
                borderWidth: 2, 
                borderColor: theme.colors.surfaceVariant,
                backgroundColor: theme.colors.background,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRadius: 24,
                  marginRight: 12,
                  padding: 8,
                  backgroundColor: theme.colors.primaryContainer,
                }}
              >
                <Icon source={t.icon} size={24} />
              </View>
              <Text
                variant="headlineMedium"
                style={{ fontWeight: 200, marginTop: 4, padding: 0 }}
              >
                {t.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

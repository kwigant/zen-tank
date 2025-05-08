import { style } from "@/constants/Styles";
import { useState } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Button, Card, useTheme } from "react-native-paper";

export default function WaterPropsChart() {
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  const graphStyle = {
    marginVertical: 8,
  };
  const pHdata = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [6.5, 7.0, 7.5, 7.0],
      },
    ],
  };
  // Ammonia //0 ppm (Green): Ideal // 0.25–0.5 ppm (Yellow): Warning // >1 ppm (Red): Danger, requires immediate action
  const NH3data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [0.5, 0.25, 0, 0],
      },
    ],
  };
  // Nitrites // 0 ppm (Green): Ideal // 0.25–0.5 ppm (Yellow): Warning – begin monitoring and partial water changes // >1 ppm (Red): Danger – toxic to fish; immediate action needed
  const NO2data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [1.0, 0.5, 0.25, 0],
      },
    ],
  };
  //Nitrates // 0–20 Ideal for most freshwater fish and shrimp // 20–40 Acceptable short term; moderate water changes // >40 Stressful to fish; causes algae; change water
  const NO3data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [0, 20, 35, 10],
      },
    ],
  };
  const [data, setData] = useState(pHdata)
  const theme = useTheme();
  const width = Dimensions.get("window").width - 96;
  const height = 220;
  const buttons = [
    { title: "pH", data: pHdata },
    { title: "Ammonia", data: NH3data },
    { title: "Nitrites", data: NO2data },
    { title: "Nitrates", data: NO3data },
  ];
  return (
    <View style={{ marginVertical: 12, backgroundColor: theme.colors.background, padding: 12, borderRadius: 8, borderWidth: 2, borderColor: theme.colors.surfaceVariant}}>
      <LineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier
        style={graphStyle}
      />
      <View style={style.row}>{buttons.map((b,i) => <Button key={i} onPress={() => setData(b.data)}>{b.title}</Button>)}</View>
    </View>
  );
}

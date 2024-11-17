import { style } from "@/constants/Styles";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

type LoadingProps = {
    loading: boolean
}

export default function Loading(props: LoadingProps) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ActivityIndicator
        style={{ alignSelf: "center" }}
        size={50}
        animating={props.loading}
      />
      <Text style={style.mt20} variant="bodyMedium">
        Loading...
      </Text>
    </View>
  );
}

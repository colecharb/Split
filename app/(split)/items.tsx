import { KeyboardAvoidingView } from "react-native";
import { Text, View } from "../../components/Themed";
import { useSearchParams } from "expo-router";

export default function () {

  const { total } = useSearchParams();
  // console.log(JSON.stringify(params));


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
    >
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", }}
      >
        <Text>
          {total}
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}
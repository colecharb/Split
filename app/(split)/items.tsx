import { KeyboardAvoidingView } from "react-native";
import { Text, View } from "../../components/Themed";

export default function () {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
    >
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", }}
      >
        <Text>
          asdfjkl;
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}
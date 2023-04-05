import { StyleSheet, TextInput, TextInputProps, useColorScheme } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";

export default function (props: TextInputProps) {

  const styles = makeStyles();

  return (
    <View style={{ flexDirection: "row", }}>
      <Text style={styles.amountStyle}>$</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.amountStyle}
        {...props}
      />
    </View>
  )
}

const makeStyles = () => {

  const theme = useColorScheme() ?? 'light';

  return StyleSheet.create({
    amountStyle: {
      color: Colors[theme].text,
      fontSize: 50,
      fontVariant: ["tabular-nums"],
    }
  });
} 
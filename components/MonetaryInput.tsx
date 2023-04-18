import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../utils/useColorScheme";

export default function (props: TextInputProps) {

  const theme = useColorScheme();
  const styles = makeStyles();

  return (
    <View style={{ flexDirection: "row", }}>
      <Text style={styles.amountStyle}>$</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.amountStyle}
        {...props}
        selectionColor={Colors[theme].text}
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
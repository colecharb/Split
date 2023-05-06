import { Button, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { LinkButton } from "../../components/Buttons";
import ScreenContainer from "../../components/ScreenContainer";
import { useContext, useState } from "react";
import { SplitContext } from "../../contexts/Split";
import useColorScheme from "../../utils/useColorScheme";
import Colors from "../../constants/Colors";

export default function EnterTotalScreen() {
  const split = useContext(SplitContext);

  const [totalInput, setTotalInput] = useState<string>("");

  const theme = useColorScheme();
  const styles = makeStyles();

  const onChangeTotal = (newTotalInput: string) => {
    if (newTotalInput === "") {
      setTotalInput("");
      split.setTotal(0);
    }

    if (!parseFloat(newTotalInput)) return;

    const t = parseFloat(newTotalInput);
    // if ((t * 100) % 1 !== 0) return;

    setTotalInput(newTotalInput);
    split.setTotal(t);
  };

  const totalValid = split.total > 0;

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* <MonetaryInput
          // autoFocus
          placeholder="0.00"
          value={totalInput}
          onChangeText={onChangeTotal}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.amountStyle}>$</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.amountStyle}
            placeholder="0.00"
            value={totalInput}
            onChangeText={onChangeTotal}
            selectionColor={Colors[theme].text}
          />

          <Button title="asdf" />
        </View>
      </View>

      <LinkButton
        href="items"
        title="Next"
        // onPress={() => {}}
        style={!totalValid ? { opacity: 0.5 } : null}
        disabled={!totalValid}
      />
    </ScreenContainer>
  );
}

const makeStyles = () => {
  const theme = useColorScheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    amountStyle: {
      color: Colors[theme].text,
      fontSize: 50,
      fontVariant: ["tabular-nums"],
    },
  });
};

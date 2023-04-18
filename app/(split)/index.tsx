import { StyleSheet } from "react-native";

import MonetaryInput from "../../components/MonetaryInput";
import { View } from "../../components/Themed";
import { Button, LinkButton } from "../../components/Buttons";
import ScreenContainer from "../../components/ScreenContainer";
import { useContext, useState } from "react";
import { SplitContext } from "../../contexts/Split";
import { Link } from "expo-router";
import { useLink } from "expo-router/build/link/useRouter";

export default function EnterTotalScreen() {
  const split = useContext(SplitContext);

  const [totalInput, setTotalInput] = useState<string>("");

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
        <MonetaryInput
          // autoFocus
          placeholder="0.00"
          value={totalInput}
          onChangeText={onChangeTotal}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

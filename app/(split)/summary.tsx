import ScreenContainer from "../../components/ScreenContainer";
import { Text, View } from "../../components/Themed";
import { SetStateAction, useContext, useState } from "react";
import { SplitContext } from "../../contexts/Split";
import useColorScheme from "../../utils/useColorScheme";
import { Keyboard, ScrollView, StyleSheet, TextInput, ViewProps } from "react-native";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

export default function () {
  const split = useContext(SplitContext);

  const styles = makeStyles();

  return (
    <ScreenContainer
      onPress={() => Keyboard.dismiss()}
      style={{ justifyContent: "center" }}
    >
      <Text style={styles.sectionTitle}>Summary</Text>

      <TextAndAmount
        text="Total"
        amount={split.total}

        // style={{ marginBottom: Layout.margin }}
      />
      <TipEntry />

      <TextAndAmount
        dollarSign
        text="Grand Total"
        amount={split.total + split.tip}
        style={{ marginVertical: Layout.margin }}
      />
      {/* {split.persons.map((person, index) => (
        <TextAndAmount
          text={person.name || `Person ${index + 1}`}
          amount={person.total}
          key={person.id}
        />
      ))} */}
      {/* <TextAndAmount
        text="Shared"
        amount={split.shared}
        style={{ marginVertical: Layout.margin }}
      /> */}

      {/* <Text style={styles.sectionTitle}>Totals Pre-Tip</Text> */}

      {/* {split.persons.map((person, index) => {
        const totalPreTip = person.total + split.shared / split.persons.length;
        return (
          <TextAndAmount
            text={person.name || `Person ${index + 1}`}
            amount={totalPreTip}
            dollarSign
            key={person.id}
          />
        );
      })} */}

      {/* <Text style={styles.sectionTitle}>Tip?</Text> */}

      <Text style={styles.sectionTitle}>The Split</Text>

      {split.persons.map((person, index) => {
        const totalPreTip = person.total + split.shared / split.persons.length;
        const totalPostTip = totalPreTip + (split.tip * totalPreTip) / split.total;
        return (
          <TextAndAmount
            text={person.name || `Person ${index + 1}`}
            amount={totalPostTip}
            dollarSign
            key={person.id}
          />
        );
      })}

      {/* <Text style={styles.sectionTitle}>Persons Data</Text>
      <Text>{JSON.stringify(split.persons, null, "  ")}</Text> */}
    </ScreenContainer>
  );
}

function TextAndAmount({
  text,
  amount,
  dollarSign = false,
  style,
  ...viewProps
}: {
  text: string;
  amount: number;
  dollarSign?: boolean;
} & ViewProps) {
  const styles = makeStyles();
  return (
    <View
      style={[styles.textAndAmountView, style]}
      {...viewProps}
    >
      <Text>{text}</Text>
      <Text style={styles.money}>
        {dollarSign ? "$" : null}
        {amount.toFixed(2)}
      </Text>
    </View>
  );
}

function TipEntry({ style, ...viewProps }: {} & ViewProps) {
  const theme = useColorScheme();
  const styles = makeStyles();
  const split = useContext(SplitContext);

  const [tipInput, setTipInput] = useState("");

  const onEndEditing = () => {
    const tipAsFloat = tipInput ? parseFloat(tipInput) : 0;
    setTipInput(tipAsFloat ? tipAsFloat.toFixed(2) : "");
    split.setTip(tipAsFloat);
  };

  return (
    <View
      style={[styles.textAndAmountView, style]}
      {...viewProps}
    >
      <Text>Tip</Text>
      <TextInput
        keyboardType="numeric"
        selectionColor={Colors[theme].text}
        placeholder="0.00"
        placeholderTextColor={Colors[theme].medium}
        style={[
          styles.money,
          styles.tipInput,
          { textDecorationColor: tipInput ? Colors[theme].text : Colors[theme].medium },
        ]}
        value={tipInput}
        onChangeText={setTipInput}
        onEndEditing={onEndEditing}
      />
    </View>
  );
}

const makeStyles = () => {
  const theme = useColorScheme();
  return StyleSheet.create({
    money: {
      color: Colors[theme].text,
      fontSize: Layout.fontSize,
      fontVariant: ["tabular-nums"],
    },
    tipInput: {
      textDecorationLine: "underline",
    },
    textAndAmountView: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    sectionTitle: {
      textAlign: "center",
      marginVertical: Layout.margin,
    },
  });
};

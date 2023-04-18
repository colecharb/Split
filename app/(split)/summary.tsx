import ScreenContainer from "../../components/ScreenContainer";
import { Text, View } from "../../components/Themed";
import { useContext } from "react";
import { SplitContext } from "../../contexts/Split";
import useColorScheme from "../../utils/useColorScheme";
import { StyleSheet, ViewProps } from "react-native";
import Layout from "../../constants/Layout";

export default function () {
  const split = useContext(SplitContext);

  const styles = makeStyles();

  return (
    <ScreenContainer>
      <TextAndAmount
        text="Total"
        amount={split.total}
        dollarSign
        style={{ marginBottom: Layout.margin }}
      />
      {split.persons.map((person, index) => (
        <TextAndAmount
          text={person.name || `Person ${index + 1}`}
          amount={person.total}
          key={person.id}
        />
      ))}
      <TextAndAmount
        text="Shared"
        amount={split.shared}
        style={{ marginVertical: Layout.margin }}
      />

      <Text style={styles.sectionTitle}>Totals Owed</Text>

      {split.persons.map((person, index) => {
        const totalOwed = person.total + split.shared / split.persons.length;
        return (
          <TextAndAmount
            text={person.name || `Person ${index + 1}`}
            amount={totalOwed}
            dollarSign
            key={person.id}
          />
        );
      })}
      {/* <Text>{JSON.stringify(split.persons, null, "  ")}</Text> */}
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

const makeStyles = () => {
  const theme = useColorScheme();
  return StyleSheet.create({
    money: {
      fontVariant: ["tabular-nums"],
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

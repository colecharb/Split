import { Text, View } from "../../components/Themed";
import ScreenContainer from "../../components/ScreenContainer";
import PersonWithItems from "../../components/PersonWithItems";
import useColorScheme from "../../utils/useColorScheme";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { LinkButton } from "../../components/Buttons";
import { useContext } from "react";
import "react-native-get-random-values";
import { SplitContext } from "../../contexts/Split";

export default function () {
  const styles = makeStyles();

  const split = useContext(SplitContext);

  return (
    <ScreenContainer>
      <Text style={styles.total}>${split.total.toFixed(2)}</Text>

      <View style={styles.personsContainer}>
        {split.persons.map((person, index) => (
          <PersonWithItems
            key={person.id}
            defaultName={`Person ${index + 1}`}
            person={person}
            setPerson={split.setPerson(index)}
          />
        ))}
      </View>

      <LinkButton
        title="Next"
        href="summary"
      />
    </ScreenContainer>
  );
}

const makeStyles = () => {
  const theme = useColorScheme();

  return StyleSheet.create({
    total: {
      textAlign: "center",
      color: Colors[theme].text,
      fontSize: 50,
      fontVariant: ["tabular-nums"],
      marginBottom: Layout.margin,
    },
    personsContainer: {
      flex: 1,
      flexDirection: "row",
      // borderColor: 'red', borderWidth: 1,
    },
  });
};

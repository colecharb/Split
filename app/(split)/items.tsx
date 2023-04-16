import { Text, View } from "../../components/Themed";
import { useSearchParams } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import PersonWithItems, { Person } from "../../components/PersonWithItems";
import useColorScheme from "../../utils/useColorScheme";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { LinkButton } from "../../components/Buttons";
import { useState } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const defaultPersons: Person[] = [
  { name: '', items: [], id: uuidv4() },
  { name: '', items: [], id: uuidv4() },
]

export default function () {

  const styles = makeStyles();
  const { total } = useSearchParams();

  const [persons, setPersons] = useState<Person[]>(defaultPersons);


  // helper function, returns a function that sets persons[index] to the supplied person.
  function setPerson(index: number) {
    return (person: Person) => setPersons(prevPersons => [
      ...prevPersons.slice(0, index),
      person,
      ...prevPersons.slice(index + 1)
    ]);
  }

  return (
    <ScreenContainer>

      <Text style={styles.total}>
        ${total}
      </Text>

      <View style={styles.personsContainer}>

        {persons.map((person, index) => (
          <PersonWithItems
            key={person.id}
            defaultName={`Person ${index + 1}`}
            person={person}
            setPerson={setPerson(index)}
          />
        ))}

      </View>

      <LinkButton
        title="Next"
        href={{
          pathname: 'summary',
          params: { persons: JSON.stringify(persons) }
        }}
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
    }
  });
}
import { useLocalSearchParams, useSearchParams } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import { Text } from "../../components/Themed";
import { Person } from "../../components/PersonWithItems";

type SummaryScreenParams = {
  persons: Person[]
}

export default function () {

  const params = useLocalSearchParams();

  const persons = JSON.parse(params.persons) as Person[];

  const personsWithTotals = persons.map(person => (
    {
      ...person,
      total: (
        person.items.map(item => (
          item.amount
        )).reduce((prevAmount, currentAmount) => (
          prevAmount + currentAmount
        ))
      ),
    }
  ));

  // console.log(JSON.stringify(personTotals, null, '  '));

  return (
    <ScreenContainer>
      {personsWithTotals?.map((person, index) => (
        <Text key={person.id}>
          {person.name ? person.name : `Person ${index + 1}`} ${person.total.toFixed(2)}
        </Text>
      ))}
    </ScreenContainer>
  )
}
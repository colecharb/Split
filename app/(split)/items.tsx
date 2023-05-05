import { Text, View } from "../../components/Themed";
import ScreenContainer from "../../components/ScreenContainer";
import PersonWithItems from "../../components/PersonWithItems";
import useColorScheme from "../../utils/useColorScheme";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import { Button, LinkButton } from "../../components/Buttons";
import { useContext } from "react";
import "react-native-get-random-values";
import { Person, SplitContext } from "../../contexts/Split";

export default function () {
  const theme = useColorScheme();
  const styles = makeStyles();

  const split = useContext(SplitContext);

  const renderPerson = ({ item: person, index }: { item: Person; index: number }) => (
    <View style={styles.personWithItemsContainer}>
      <PersonWithItems
        key={person.id}
        defaultName={`Person ${index + 1}`}
        person={person}
        setPerson={split.setPerson(index)}
      />
    </View>
  );

  const ItemSeparatorComponent = () => (
    <View style={{ width: Layout.borderWidth, backgroundColor: Colors[theme].subtle }} />
  );

  const AddPersonComponent = () => (
    <Button
      title="+"
      viewStyle={{ paddingHorizontal: Layout.margin * 2 }}
      onPress={() => {
        split.addPerson();
      }}
    />
  );

  return (
    <ScreenContainer>
      <Text style={styles.total}>${split.total.toFixed(2)}</Text>

      <FlatList
        horizontal
        keyboardShouldPersistTaps="handled" // allows button presses in this flatlist when keyboard is open
        data={split.persons}
        renderItem={renderPerson}
        style={styles.personsFlatList}
        contentContainerStyle={styles.personsContainer}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={AddPersonComponent}
      />

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
      // marginBottom: Layout.margin,
    },
    personsFlatList: {},
    personsContainer: {
      padding: Layout.margin,
      // flex: 1,
      // flexDirection: "row",
      // borderColor: "red",
      // borderWidth: 1,
    },
    personWithItemsContainer: {
      padding: Layout.margin,
      // borderColor: "green",
      // borderWidth: 1,
    },
  });
};

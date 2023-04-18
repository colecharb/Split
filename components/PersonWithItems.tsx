import { Text, View } from "./Themed";
import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import useColorScheme from "../utils/useColorScheme";
import Colors from "../constants/Colors";
import { Button } from "./Buttons";
import Layout from "../constants/Layout";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Person } from "../contexts/Split";

export type ItemData = {
  id: string; // for selecting and editing individual items
  amount: number;
};

function Item({ id, amount }: ItemData) {
  // const ref_TextInput = useRef<TextInput>(null);

  const styles = makeStyles();

  return (
    <Pressable
    // onPress={() => ref_TextInput.current?.focus()}
    >
      {/* <TextInput
        autoFocus
        keyboardType="numeric"
        ref={ref_TextInput}
        style={styles.itemAmount}
      // value={amount}
      /> */}

      <Text style={styles.itemAmount}>{amount.toFixed(2)}</Text>
    </Pressable>
  );
}

type PersonWithItemsParams = {
  defaultName: string;
  person: Person;
  setPerson: (person: Person) => void; // sets state in parent
};

export default function ({
  defaultName,
  person,
  setPerson,
}: PersonWithItemsParams) {
  const setName = (name: string) => {
    name = name.trim();
    setPerson({ ...person, name });
  };

  const setItems = (items: ItemData[]) => {
    setPerson({ ...person, items });
  };

  const theme = useColorScheme();
  const styles = makeStyles();

  const addItem = () => {
    const newItem: ItemData = {
      id: uuidv4(),
      amount: Math.random() * 14 + 1,
    };
    setItems([newItem, ...person.items]);
  };

  const renderItem = ({ item: { id, amount } }: { item: ItemData }) => (
    <Item
      id={id}
      amount={amount}
    />
  );

  const ListHeaderComponent = () => (
    <Button
      viewStyle={{ margin: Layout.margin }}
      title="add item"
      onPress={addItem}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={person.name}
        onChangeText={setName}
        placeholder={defaultName}
        placeholderTextColor={Colors[theme].medium}
        style={styles.name}
        selectionColor={Colors[theme].tint}
      />
      <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
        <FlatList
          data={person.items}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.itemsContainer}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const makeStyles = () => {
  const theme = useColorScheme();

  return StyleSheet.create({
    name: {
      textAlign: "center",
      fontSize: 35,
      fontWeight: "bold",
      textDecorationLine: "underline",
      color: Colors[theme].text,
      // margin: Layout.margin,
    },
    itemsContainer: {
      alignItems: "center",
      // margin: Layout.margin,
      borderColor: "red",
      borderWidth: 1,
    },
    itemAmount: {
      color: Colors[theme].text,
      fontSize: 30,
      textAlign: "center",
      fontVariant: ["tabular-nums"],
      width: "100%",
      // borderWidth: 1, borderColor: 'red',
    },
  });
};

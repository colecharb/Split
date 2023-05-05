import { View } from "./Themed";
import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import useColorScheme from "../utils/useColorScheme";
import Colors from "../constants/Colors";
import { Button } from "./Buttons";
import Layout from "../constants/Layout";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Person } from "../contexts/Split";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export type ItemData = {
  id: string; // for selecting and editing individual items
  amount: number;
};

export type ItemComponentProps = ItemData & {
  setAmount: (newAmount: number) => void;
  removeItem: () => void;
};

function Item({ id, amount, setAmount, removeItem }: ItemComponentProps) {
  // const ref_TextInput = useRef<TextInput>(null);

  const [inputText, setInputText] = useState("");

  const theme = useColorScheme();
  const styles = makeStyles();

  const onEndEditing = () => {
    parseFloat(inputText) > 0 ? setAmount(parseFloat(inputText)) : removeItem();
    if (parseFloat(inputText) > 0) {
      const inputAsFloat = parseFloat(inputText);
      setInputText(inputAsFloat.toFixed(2));
      setAmount(inputAsFloat);
    }
  };

  return (
    <View style={styles.itemAmountContainer}>
      <FontAwesome
        name="trash-o"
        style={[styles.itemAmount, { color: Colors[theme].subtle, marginRight: Layout.margin }]}
        onPress={removeItem}
      />
      <TextInput
        autoFocus
        selectionColor={Colors[theme].text}
        keyboardType="numeric"
        // ref={ref_TextInput}
        style={styles.itemAmount}
        value={inputText}
        onChangeText={setInputText}
        onEndEditing={onEndEditing}
      />
    </View>
  );
}

type PersonWithItemsParams = {
  defaultName: string;
  person: Person;
  setPerson: (person: Person) => void; // sets state in parent
};

function PersonWithItems({ defaultName, person, setPerson }: PersonWithItemsParams) {
  const theme = useColorScheme();
  const styles = makeStyles();

  const [nameInput, setNameInput] = useState(person.name);

  const setName = () => {
    const name = nameInput.trim();
    setNameInput(name);
    setPerson({ ...person, name });
  };

  const setItems = (items: ItemData[]) => {
    setPerson({ ...person, items });
  };

  const setItem = (index: number) => {
    return (item: ItemData) => {
      setItems([...person.items.slice(0, index), item, ...person.items.slice(index + 1)]);
    };
  };

  const addItem = () => {
    const newItem: ItemData = {
      id: uuidv4(),
      amount: 0,
    };
    setItems([newItem, ...person.items]);
  };

  const renderItem = ({ item, index }: { item: ItemData; index: number }) => (
    <Item
      id={item.id}
      amount={item.amount}
      setAmount={(newAmount) => {
        setItem(index)({ ...item, amount: newAmount });
        console.log(`Setting item at index ${index} to ${newAmount}`);
      }}
      removeItem={() => {
        setItems([...person.items.slice(0, index), ...person.items.slice(index + 1)]);
        console.log("Removing item at index", index);
      }}
    />
  );

  const AddItemButton = () => (
    <Button
      viewStyle={{}}
      title="+"
      onPress={addItem}
    />
  );

  return (
    <View style={{ flex: 1, minWidth: 100 }}>
      <TextInput
        autoFocus
        value={nameInput}
        onChangeText={setNameInput}
        onEndEditing={setName}
        placeholder={defaultName}
        placeholderTextColor={Colors[theme].medium}
        style={styles.name}
        selectionColor={Colors[theme].tint}
      />

      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* <View style={{ flex: 1 }} /> */}
        <FlatList
          data={person.items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
          // ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
        {/* <View style={{ flex: 1 }} /> */}
      </View>

      <AddItemButton />
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
      // textDecorationLine: "underline",
      color: Colors[theme].text,
      borderBottomColor: Colors[theme].text,
      borderBottomWidth: Layout.borderWidth * 2,
      // margin: Layout.margin,
    },
    itemsContainer: {
      includeFontPadding: false,
      padding: Layout.margin,
      overflow: "visible",
      // alignItems: "flex-end",
      // alignContent: "center",
      // borderColor: "yellow",
      // borderWidth: 1,
      // margin: Layout.margin,
    },
    itemAmount: {
      color: Colors[theme].text,
      fontSize: 30,
      textAlign: "right",
      fontVariant: ["tabular-nums"],
      // borderWidth: 1,
      // borderColor: "grey",
      // width: "100%",
    },
    itemAmountContainer: {
      // borderBottomWidth: Layout.borderWidth,
      borderColor: Colors[theme].subtle,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};

export default memo(PersonWithItems);

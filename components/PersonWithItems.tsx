import { Text, View } from "./Themed";
import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleSheet, TextInput } from "react-native";
import useColorScheme from "../utils/useColorScheme";
import Colors from "../constants/Colors";
import { LegacyRef, useRef, useState } from "react";
import { Button } from "./Buttons";
import Layout from "../constants/Layout";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// const dummyItems: number[] = [
//   Math.round(Math.random() * 1000) / 100 + 2,
//   Math.round(Math.random() * 1000) / 100 + 2,
//   Math.round(Math.random() * 1000) / 100 + 2
// ]

type ItemData = {
  id: string, // for selecting and editing individual items
  amount: number,
}


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

      <Text
        style={styles.itemAmount}
      >
        {amount.toFixed(2)}
      </Text>

    </Pressable>
  )
}


type PersonWithItemsParams = {
  defaultName: string
}

export default function ({ defaultName }: PersonWithItemsParams) {

  const [name, setName] = useState<string>('')
  const [items, setItems] = useState<ItemData[]>([]);

  const ref_FlatList = useRef<FlatList>(null);

  const theme = useColorScheme();
  const styles = makeStyles();

  const addItem = () => {

    const newItem: ItemData = {
      id: uuidv4(),
      amount: Math.random() * 50
    }

    setItems(currentItems => [newItem, ...currentItems]);
  }

  const renderItem = ({ item: { id, amount } }: { item: ItemData }) => (
    <Item
      id={id}
      amount={amount}
    />
  );

  const ListFooterComponent = () => (
    <Button
      title="add item"
      onPress={addItem}
    />
  )

  return (

    <View style={{ flex: 1 }}>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.name}
        selectionColor={Colors[theme].tint}
        placeholder={defaultName}
        placeholderTextColor={Colors[theme].medium}
      />

      <FlatList
        ref={ref_FlatList}
        data={items}
        keyExtractor={item => item.id}
        // onScrollEndDrag={onScrollEndDrag}

        contentContainerStyle={styles.itemsContainer}

        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />

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
      margin: Layout.margin,
    },
    itemsContainer: {
      alignItems: "center",
    },
    itemAmount: {
      color: Colors[theme].text,
      fontSize: 30,
      textAlign: "center",
      fontVariant: ["tabular-nums"],
      width: '100%',
      // borderWidth: 1, borderColor: 'red',
    }
  });
}
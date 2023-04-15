import { Text, View } from "../../components/Themed";
import { useSearchParams } from "expo-router";
import ScreenContainer from "../../components/ScreenContainer";
import PersonWithItems from "../../components/PersonWithItems";
import useColorScheme from "../../utils/useColorScheme";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export default function () {

  const styles = makeStyles();
  const { total } = useSearchParams();

  return (
    <ScreenContainer>
      {/* <View
        style={{ flex: 1 }}
      > */}

      <Text style={styles.total}>
        {total}
      </Text>

      <PersonWithItems defaultName="Name" />

      {/* </View> */}
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
    }
  });
}
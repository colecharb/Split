import { Link } from "expo-router";
import { Text, View } from "./Themed";
import { LinkProps } from "expo-router/build/link/Link";
import useColorScheme from "../utils/useColorScheme";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";


export default function ({ title, viewStyle, textStyle, ...linkProps }: { title: string, viewStyle?: ViewStyle, textStyle?: TextStyle } & LinkProps) {
  const theme = useColorScheme();
  const styles = makeStyles();
  return (
    <Link {...linkProps} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.buttonView, viewStyle, pressed ? { opacity: 0.5 } : null]}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

const makeStyles = () => {

  const theme = useColorScheme();

  return StyleSheet.create({
    buttonView: {
      backgroundColor: 'transparent',
      borderRadius: Layout.borderRadius,
      borderWidth: Layout.borderWidth,
      borderColor: Colors[theme].medium,
      padding: Layout.margin,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: Layout.fontSize,
      textTransform: 'capitalize',
      textAlign: 'center',
      color: Colors[theme].medium,
    }
  })
}
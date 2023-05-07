import 'expo-router/entry';
import { Alert } from "react-native/types";

ErrorUtils.setGlobalHandler((error, isFatal) => {
  // Log the error to your preferred error tracking service
  console.error(error, isFatal);

  if (isFatal) {
    Alert.alert("A fatal error occurred.");
  }
});
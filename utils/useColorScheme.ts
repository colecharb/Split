import { useColorScheme as _useColorScheme } from "react-native";

type Theme = 'light' | 'dark';

function useColorScheme() {
  return _useColorScheme() as Theme;
}

export default useColorScheme;
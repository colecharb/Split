import { ReactNode } from "react";
import { KeyboardAvoidingView } from "react-native";
import Layout from "../constants/Layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ({ children }: { children: ReactNode }) {

  const safeAreaInsets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: Layout.margin,
        // borderColor: 'red', borderWidth: 2,
        marginTop: safeAreaInsets.top,
        marginBottom: safeAreaInsets.bottom
      }}
      behavior='height'
    >
      {children}
    </KeyboardAvoidingView>
  )
}
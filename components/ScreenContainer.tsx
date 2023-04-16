import { ReactNode } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../constants/Layout";

export default function ({ children, ...props }: { children: ReactNode } & KeyboardAvoidingViewProps) {

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
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
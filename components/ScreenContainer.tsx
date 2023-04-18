import { ReactNode } from "react";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../constants/Layout";
import { View } from "./Themed";

export default function ({
  children,
  style,
  ...props
}: { children: ReactNode } & KeyboardAvoidingViewProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={[
        {
          flex: 1,
          // padding: Layout.margin,
          // borderColor: 'red', borderWidth: 2,
          marginTop: safeAreaInsets.top,
          marginBottom: safeAreaInsets.bottom,
        },
        style,
      ]}
      behavior="padding"
      {...props}
    >
      <View
        style={{
          flex: 1,
          padding: Layout.margin,
        }}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
}

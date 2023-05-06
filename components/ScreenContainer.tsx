import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../constants/Layout";

export default function ({
  children,
  style,
  noPadding,
  ...props
}: {
  children: ReactNode;
  noPadding?: boolean;
} & KeyboardAvoidingViewProps) {
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
      {/* <Pressable
        style={{
          flex: 1,
          padding: Layout.margin,
        }}
      > */}
      <View style={{ flex: 1, padding: noPadding ? undefined : Layout.margin }}>
        {children}
      </View>

      {/* </Pressable> */}
    </KeyboardAvoidingView>
  );
}

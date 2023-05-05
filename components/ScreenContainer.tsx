import { ReactNode } from "react";
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Layout from "../constants/Layout";

export default function ({
  children,
  style,
  onPress,
  ...props
}: {
  children: ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
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
      <Pressable
        onPress={onPress}
        style={{
          flex: 1,
          padding: Layout.margin,
        }}
      >
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

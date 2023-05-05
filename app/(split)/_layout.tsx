import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function StackLayout() {

  return (
    <>
      {/* <StatusBar hidden /> */}

      <Stack
        screenOptions={{
          headerShown: false,
          // headerTransparent: true,
          // headerLargeTitle: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Enter Total",
            // headerRight: () => (
            //   <Link href="/modal" asChild>
            //     <Pressable>
            //       {({ pressed }) => (
            //         <FontAwesome
            //           name='gears'
            //           size={25}
            //           color={Colors[colorScheme ?? 'light'].text}
            //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            //         />
            //       )}
            //     </Pressable>
            //   </Link>
            // ),
          }}
        />
        <Stack.Screen
          name="items"
          options={{
            title: "Enter Items",
          }}
        />
        <Stack.Screen
          name="summary"
          options={{
            title: "Summary",
          }}
        />
      </Stack>
    </>
  );
}

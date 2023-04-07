import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function StackLayout() {

  return (
    <>
      <StatusBar hidden />

      <Stack
        screenOptions={{
          headerShown: false,
          // headerTransparent: true,
          // headerLargeTitle: true,
        }}>

        <Stack.Screen
          name="index"
          options={{
            title: 'Enter Total',
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
            title: "Eneter Items"
          }}
        />
      </Stack>
    </>
  );
}

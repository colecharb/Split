import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import MonetaryInput from '../../components/MonetaryInput';
import { Text, View } from '../../components/Themed';
import { Link } from 'expo-router';
import LinkButton from '../../components/LinkButton';

export default function TabTwoScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
    >
      <View style={styles.container}>
        <MonetaryInput
          autoFocus
          placeholder='0.00'
        />
      </View>

      <LinkButton
        title="Next"
        href="items"
      />


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

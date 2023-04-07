import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import MonetaryInput from '../../components/MonetaryInput';
import { View } from '../../components/Themed';
import LinkButton from '../../components/LinkButton';
import ScreenContainer from '../../components/ScreenContainer';
import { useState } from 'react';

export default function TabTwoScreen() {

  const [total, setTotal] = useState<string>('');

  // const onChangeAmount = (newAmount: string) => {
  //   setTotal(newAmount);
  // }

  const totalValid = parseFloat(total) > 0;

  return (
    <ScreenContainer>

      <View style={styles.container}>

        <MonetaryInput
          autoFocus
          placeholder='0.00'
          value={total}
          onChangeText={setTotal}
        />

      </View>

      <LinkButton
        title="Next"
        href={{ pathname: "items", params: { total: parseFloat(total).toFixed(2) } }}
        disabled={!totalValid}
      />

    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

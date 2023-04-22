import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InstructionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Instruction Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  }
});

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const InstructionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>
          1. The computer displays a set of 5 cards within the range of 1-16.
        </Text>
        <Text style={styles.text}>
          2. A target number is shown.
        </Text>
        <Text style={styles.text}>
          3. Make an equation such that, at the end, the number on the target card should be equal to the equation made.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000000',
  },
});

export default InstructionScreen;

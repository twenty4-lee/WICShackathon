import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const InstructionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructions</Text>
      <ScrollView style={styles.textContainer}>
        <Text style={styles.text}>
          Welcome to MathMania!
        </Text>
        <Text style={styles.text}>
          To play the game, create the number on the top row using the numbers on the bottom row and arithmetic operators.
        </Text>
        <Text style={styles.text}>
          You can save combinations of numbers using the save button. 
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFEE',
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

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TeacherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teacher Screen</Text>
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

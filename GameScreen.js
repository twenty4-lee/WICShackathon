import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameScreen() {
  const [goalNumber, setGoalNumber] = useState(0);
  const [cards, setCards] = useState([]);

  // generate a random number between 1 and 16 for the goal number
  useEffect(() => {
    setGoalNumber(Math.floor(Math.random() * 16) + 1);
  }, []);

  // generate six random numbers for the cards
  useEffect(() => {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const number = Math.floor(Math.random() * 16) + 1;
      if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
      }
    }
    setCards(randomNumbers);
  }, []);

  const handleCardPress = (number) => {
    // TODO: implement card press logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make {goalNumber} with the cards</Text>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>{goalNumber}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {cards.map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.card}
            onPress={() => handleCardPress(number)}
          >
            <Text style={styles.cardText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameScreen() {
  const [goalNumber, setGoalNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState([]);

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
    let isValid = true;
    if (typeof result[result.length - 1] !== 'number' && (number === '+' || number === '-' || number === '*' || number === '/')) {
      // Show error message popup
      alert("You should click a number first!");
      isValid = false;
    }
    if (isValid) {
      const newResult = [...result, number];
      setResult(newResult);
      const newCards = [...cards];
      const cardIndex = newCards.indexOf(number);
      if (cardIndex !== -1) {
        newCards.splice(cardIndex, 1);
        setCards(newCards);
      }
    }      
  };

  const calculateResult = () => {
    const expression = result.join('');
    const answer = eval(expression);
    setResult([answer]);
  };

  const checkResult = (calculatedResult, goalNumber) => {
    if (calculatedResult === goalNumber) {
      alert("Congratulations! You have reached the goal number.");
    } else {
      alert("Sorry, the calculated result does not match the goal number.");
    }
  };
  
  const handleSubmit = () => {
    const calculatedResult = eval(result.join(''));
    checkResult(calculatedResult, goalNumber);
  };
  
  const handleSave = (setCards, cards) => {
    const calculatedResult = eval(result.join(''));
    setCards([...cards,calculatedResult]);
  };

  return (
  <View style={styles.container}>
    <View style={styles.resultContainer}>
  {result.map((number, index) => (
    <Text key={index} style={styles.resultText}>{number}</Text>
  ))}
<View style={styles.submitBtnContainer}>
  <TouchableOpacity style={styles.saveBtn} onPress={() => { calculateResult(); handleSave(setCards, cards); }}>
    <Text style={styles.saveBtnText}>Save</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.submitBtn} onPress={() => { handleSubmit(); }}>
    <Text style={styles.submitBtnText}>Submit</Text>
  </TouchableOpacity>
</View>
</View>
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
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("+")}
        >
          <Text style={styles.cardText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("-")}
        >
          <Text style={styles.cardText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("*")}
        >
          <Text style={styles.cardText}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress("/")}
        >
          <Text style={styles.cardText}>/</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    resultContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        marginBottom: 20,
        flexDirection: 'row', // add this
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      submitBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
      },
      submitBtn: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
      },
      submitBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      saveBtn: {
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
      },
      saveBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      
      
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
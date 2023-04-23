import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameScreen() {
  const [goalNumber, setGoalNumber] = useState(0);
  const [cards, setCards] = useState([]);
  const [result, setResult] = useState([]);
  const [points, setPoints] = useState(0);
  const [tries, setTries] = useState(3);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const nextQuestion = () => {
    if (questionNumber < 10) {
      setQuestionNumber(questionNumber + 1);
      setTries(3);
      setResult([]);
    } else {
      setGameOver(true);
    }
  };

  // generate a random number between 1 and 16 for the goal number
  useEffect(() => {
    setGoalNumber(Math.floor(Math.random() * 16) + 1);
  }, []);

  // generate six random numbers for the cards
  function generateRandomNumbers(numCards) {
    const randomNumbers = [];
    while (randomNumbers.length < numCards) {
      const number = Math.floor(Math.random() * 16) + 1;
      if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
      }
    }
    return randomNumbers;
  }
  useEffect(() => {
    const cards = generateRandomNumbers(6);
    setCards(cards);
  }, [points]);
  

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
      setPoints(points + 1);
    } else {
      alert("Sorry, the calculated result does not match the goal number.");
      setTries(tries - 1);
      if (tries == 0){
        setGameOver(true);
      }
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

 const clearResult = () => {
  setResult([]);
}

const handleSkip = () => {
  nextQuestion();
  clearResult();
  setGoalNumber(Math.floor(Math.random() * 16) + 1);
  const cards = generateRandomNumbers(6);
  setCards(cards);
  
};

  return (
    gameOver ? (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.points}>Total Points: {points}</Text>
      </View>
    ) : (
  <View style={styles.container}>
      <Text style={styles.points}>Points: {points}</Text>
      <Text style={styles.tries}>Tries Left: {tries}</Text>
      <Text style={styles.questionNumber}>Question: {questionNumber}/10</Text>
    <View style={styles.resultContainer}>
  {result.map((number, index) => (
    <Text key={index} style={styles.resultText}>{number}</Text>
  ))}
<View style={styles.submitBtnContainer}>
  <TouchableOpacity style={styles.saveBtn} onPress={() => { clearResult(); handleSave(setCards, cards); }}>
    <Text style={styles.saveBtnText}>Save</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.submitBtn} onPress={() => { handleSubmit(); clearResult(); setGoalNumber(Math.floor(Math.random() * 16) + 1);}}>
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
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
    </View>
  ));
}

const styles = StyleSheet.create({
  gameOverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  tries: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  points: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  skipBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  skipBtnText: {
    fontSize: 16,
    fontWeight: 'bold',

    color: "#FFF",
  },

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
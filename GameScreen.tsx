
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

export default function GameScreen({ 
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "GameScreen">) {

  const {
    allowNegativeNumbers = false,
    operandDifficulty = ["add", "subtract"],
    maxTargetNumber = 20,
    useModifiedScoring = true,
  } = route.params || {};
  
  console.log('GameScreen entered');
  const [goalNumber, setGoalNumber] = useState(0);
  const [cards, setCards] = useState<number[]>([]);
  const [result, setResult] = useState<(number | string)[]>([]);
  const [points, setPoints] = useState(0);
  
  let flashingColor = "#f0f0f0";

  const [tries, setTries] = useState(3);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState("solo"); // set this to "group" or "solo" as needed
  const [showSettings, setShowSettings] = useState(gameMode === "solo");

  console.log('initial consts activated');

  const nextQuestion = () => {
    if (questionNumber < 10) {
      setQuestionNumber(questionNumber + 1);
      setTries(3);
      setResult([]);
      const { target, terms } = generateEquation();
      setGoalNumber(target);
      populateCards(terms);
    } else {
      setGameOver(true);
    }
  };
  console.log('next question const activated');
  const generateEquation = () => {
    console.log("started");
    let numTerms, terms, target;
  
    do {
      numTerms = Math.floor(Math.random() * 3) + 2;
      terms = [];
      target = 0;
  
      for (let i = 0; i < numTerms; i++) {
        console.log("for loop entered");
        const term = Math.floor(Math.random() * 16) + 1;
        if (i % 2 === 0 || !allowNegativeNumbers) {
          target += term;
          terms.push(term);
        } else {
          target -= term;
          terms.push(-term);
        }
      }
    } while (target < 10 || target > maxTargetNumber);
  
    console.log("while loop ended");
    return { target, terms };
  };
  
  console.log('generate equations const activated');

  const populateCards = (terms: number[]) => {
    const randomNumbers: number[] = [...terms];
    while (randomNumbers.length < 6) {
      const number = Math.floor(Math.random() * 16) + 1;
      if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
      }
    }
    setCards(randomNumbers);
  };
  console.log('populate const activated');
  useEffect(() => {
    console.log('useEffect started');
    const { target, terms } = generateEquation();
    console.log('generateEquation started');
    setGoalNumber(target);
    console.log('setGoal started');
    populateCards(terms);
    console.log('popCards started');
  }, [points]);

  console.log('useEffect activated');
  const handleCardPress = (number: number | string) => {
    console.log('handleCardPress called with:', number);
    if (
      typeof result[result.length - 1] !== "number" &&
      ((number === "+" || number === "-") ||
        (operandDifficulty.includes("multiplication") && number === "*") ||
        (operandDifficulty.includes("division") && number === "/"))
    ) {
      alert("You should click a number first!");
      return;
    }
    const newResult: (number | string)[] = [...result, number];
    setResult(newResult);
    const newCards = [...cards];
    if (typeof number === 'number') { // Add this type guard
      const cardIndex = newCards.indexOf(number);
      if (cardIndex !== -1) {
        newCards.splice(cardIndex, 1);
        setCards(newCards);
      }
    }
  };
  
  console.log('handle card press activated');

  const checkResult = (calculatedResult, goalNumber) => {

  
    if (calculatedResult === goalNumber) {

      setResult([]);
      setPoints(points + 1);
    } else {
   
      setTries(tries - 1);
    }
  };
  
  console.log('check result activated');


  const handleSkip = () => {
    nextQuestion();
  };

  const handleBackPress = () => {
    setResult(result.slice(0, -1));
  };

  const handleSubmit = () => {
    const calculatedResult = eval(result.join(""));
    console.log('handleSubmit called with calculatedResult:', calculatedResult); 

    checkResult(calculatedResult, goalNumber);
  };
  console.log('handle submit activated');

  return (
    gameOver ? (
      <View style={styles.gameOverContainer}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.points}>Total Points: {points}</Text>
      </View>
    ) : (
      <View style={styles.container}>
        {showSettings && (
          <TouchableOpacity style={styles.settingsBtn}
          onPress={() => navigation.navigate('SettingsScreen')}>
            <Ionicons name="settings" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.points}>Points: {points}</Text>
        <Text style={styles.tries}>Tries left: {tries}</Text>
        <Text style={styles.questionNumber}>Question: {questionNumber}/10</Text>
        <View
        style={
          styles.resultContainer
        }
      >
          {result.map((number, index) => (
            <Text key={index} style={styles.resultText}>
              {number}
            </Text>
          ))}
          <View style={styles.submitBtnContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
        <Text style={styles.title}>Make {goalNumber} with the cards</Text>
        <View style={styles.cardContainer}>
        {cards.map((number, index) => (
          <TouchableOpacity
            key={`${index}-${number}`}
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
        </View>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipBtnText}>Skip</Text>
        </TouchableOpacity>
      </View>
    )
  )};


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
  tries: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  settingsBtn: {
    position: "absolute",
    top: 10,
    right: 10,
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
    color: "#FFF",
  },
    resultContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#808080',
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
      backBtn: {
        backgroundColor: '#eee',
        marginRight: 10,
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
  points: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  
});

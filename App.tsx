import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import StudentScreen from './StudentScreen';
import InstructionScreen from './InstructionScreen';
import GameScreen from './GameScreen';
import SettingsScreen from './SettingsScreen';

export type RootStackParamList = {
  GameScreen: {
    allowNegativeNumbers: boolean;
    operandDifficulty: string[];
    maxTargetNumber: number;
    numQuestions: number;
    numTries: number;
    useModifiedScoring: boolean;
  };
  SettingsScreen: {
    allowNegativeNumbers?: boolean;
    operandDifficulty?: string[];
    maxTargetNumber?: number;
    numQuestions?: number;
    numTries?: number;
    useModifiedScoring?: boolean;
  };
  Home: undefined;
  Student: undefined;
  Login: undefined;
  SignUp: undefined;
  Instruction: undefined;
  Game: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Student" component={StudentScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Instruction" component={InstructionScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});

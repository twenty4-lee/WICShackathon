import { auth } from "./firebase-config";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username + "@example.com", password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Logged in user:', user.uid);
        // Navigate to the home screen or any other screen you want to show after login
        navigation.navigate('Student');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error logging in: ${errorCode} ${errorMessage}`);
        // Show an error message to the user
        alert("Incorrect username or password. Please try again.")
      });
  };
  

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccount} onPress={handleSignUp}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueAsGuest} onPress={() => navigation.navigate('Student')}>
        <Text style={styles.continueAsGuestText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createAccount: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  createAccountText: {
    color: '#00A5E3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueAsGuest: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  continueAsGuestText: {
    color: '#FFBF65',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;

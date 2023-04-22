import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import styles from '../styles.ts';

const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <View style={{ width: 300, height: 200 }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={require('../assets/logos/symbol.png')}
        />
        </View>
      </View>
      <Text style={styles.title}>Math Mania</Text>
      <Text style={styles.subtitle}>
        “The only way to learn mathematics is to do mathematics”
      </Text>
      <Text style={styles.boop}>- Paul Halmos</Text>

      <Pressable
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Enter</Text>
      </Pressable>
    </View>
  );
};

export default InitialScreen;
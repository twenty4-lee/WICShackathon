import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Slider,
  StyleSheet,
} from "react-native";

const SettingsScreen = ({ navigation }) => {
  const [allowAdd, setAllowAdd] = useState(true);
  const [allowSubtract, setAllowSubtract] = useState(true);
  const [allowMultiply, setAllowMultiply] = useState(false);
  const [allowDivide, setAllowDivide] = useState(false);
  const [allowNegativeNumbers, setAllowNegativeNumbers] = useState(false);
  const [maxTargetNumber, setMaxTargetNumber] = useState(20);
  const [numQuestions, setNumQuestions] = useState(10);
  const [numTries, setNumTries] = useState(3);
  const [unlimitedTries, setUnlimitedTries] = useState(false);

  // ... (other settings state variables)

  const OperandButton = ({ operand, isActive, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.operandButton,
          { backgroundColor: isActive ? "#007AFF" : "#D3D3D3" },
        ]}
      >
        <Text style={styles.operandButtonText}>{operand}</Text>
      </TouchableOpacity>
    );
  };
  

  // Save settings and navigate back to the GameScreen
  const saveSettings = () => {
    navigation.navigate("GameScreen", {
      allowNegativeNumbers,
      operandDifficulty: [
        ...(allowAdd ? ["add"] : []),
        ...(allowSubtract ? ["subtract"] : []),
        ...(allowMultiply ? ["multiplication"] : []),
        ...(allowDivide ? ["division"] : []),
      ],
      maxTargetNumber,
      numQuestions,
      numTries: unlimitedTries ? -1 : numTries,
    });
  };

  // Render code for the SettingsScreen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
  
      {/* ... (previous settings UI) */}
        <View style={styles.settingRow}>
    <Text style={styles.settingLabel}>Operations:</Text>
    <OperandButton
        operand="+"
        isActive={allowAdd}
        onPress={() => setAllowAdd(!allowAdd)}
    />
    <OperandButton
        operand="-"
        isActive={allowSubtract}
        onPress={() => setAllowSubtract(!allowSubtract)}
    />
    <OperandButton
        operand="×"
        isActive={allowMultiply}
        onPress={() => setAllowMultiply(!allowMultiply)}
    />
    <OperandButton
        operand="÷"
        isActive={allowDivide}
        onPress={() => setAllowDivide(!allowDivide)}
    />
    </View>
  
      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  )};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    settingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    settingLabel: {
      fontSize: 18,
      marginRight: 10,
    },
    saveButton: {
      backgroundColor: "#007AFF",
      borderRadius: 5,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: 20,
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    operandButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      operandButtonText: {
        fontSize: 18,
        color: "#FFFFFF",
      },
  });

  export default SettingsScreen;
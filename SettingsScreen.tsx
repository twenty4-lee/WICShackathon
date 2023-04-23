import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import Slider from '@react-native-community/slider';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./App";



const SettingsScreen: React.FC<StackScreenProps<RootStackParamList, "SettingsScreen">> = ({ navigation, route }) => {
  const {
    allowNegativeNumbers: defaultAllowNegativeNumbers = false,
    operandDifficulty: defaultOperandDifficulty = ["add", "subtract"],
    maxTargetNumber: defaultMaxTargetNumber = 20,
    numQuestions: defaultNumQuestions = 10,
    numTries: defaultNumTries = 3,
    useModifiedScoring: defaultUseModifiedScoring = true,
  } = route.params || {};

  // Replace the useState initial values with the default values from route.params
  const [allowAdd, setAllowAdd] = useState(defaultOperandDifficulty.includes("add"));
  const [allowSubtract, setAllowSubtract] = useState(defaultOperandDifficulty.includes("subtract"));
  const [allowMultiply, setAllowMultiply] = useState(defaultOperandDifficulty.includes("multiplication"));
  const [allowDivide, setAllowDivide] = useState(defaultOperandDifficulty.includes("division"));
  const [allowNegativeNumbers, setAllowNegativeNumbers] = useState(defaultAllowNegativeNumbers);
  const [maxTargetNumber, setMaxTargetNumber] = useState(defaultMaxTargetNumber);
  const [numQuestions, setNumQuestions] = useState(defaultNumQuestions);
  const [numTries, setNumTries] = useState(defaultNumTries);
  const [unlimitedTries, setUnlimitedTries] = useState(defaultNumTries === -1);
  const [useModifiedScoring, setUseModifiedScoring] = useState(defaultUseModifiedScoring);


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

  const saveSettings = () => {
    console.log("Saving settings...");
    navigation.navigate("GameScreen", {
      allowNegativeNumbers,
      operandDifficulty: [
        ...(allowAdd ? ["add"] : []),
        ...(allowSubtract ? ["subtract"] : []),
        ...(allowMultiply ? ["multiplication"] : []),
        ...(allowDivide ? ["division"] : []),
      ] as string[], // Add the type assertion here
      maxTargetNumber,
      numQuestions,
      numTries: unlimitedTries ? -1 : numTries,
      useModifiedScoring,
    });
    console.log("Settings saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

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

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Allow Negative Numbers:</Text>
        <Switch
          value={allowNegativeNumbers}
          onValueChange={(value) => setAllowNegativeNumbers(value)}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Max Target Number:</Text>
        <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={10}
        maximumValue={100}
        step={1}
        value={maxTargetNumber}
        onValueChange={(value) => setMaxTargetNumber(value)}
        />
        <Text style={styles.sliderValue}>{maxTargetNumber}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Number of Questions:</Text>
        <Slider
          style={{ flex: 1 }}
          value={numQuestions}
          step={1}
          minimumValue={1}
          maximumValue={20}
          onValueChange={(value) => setNumQuestions(value)}
          />
          <Text style={styles.sliderValue}>{numQuestions}</Text>
          </View> <View style={styles.settingRow}>
    <Text style={styles.settingLabel}>Number of Tries:</Text>
    <Slider
      style={{ flex: 1 }}
      value={numTries}
      step={1}
      minimumValue={1}
      maximumValue={10}
      onValueChange={(value) => setNumTries(value)}
      disabled={unlimitedTries}
    />
    <Text style={styles.sliderValue}>{numTries}</Text>
  </View>

  <View style={styles.settingRow}>
    <Text style={styles.settingLabel}>Unlimited Tries:</Text>
    <Switch
      value={unlimitedTries}
      onValueChange={(value) => setUnlimitedTries(value)}
    />
  </View>
  <View style={styles.settingRow}>
  <Text style={styles.settingLabel}>Modified Scoring:</Text>
  <Switch
    value={useModifiedScoring}
    onValueChange={(value) => setUseModifiedScoring(value)}
  />
</View>

  <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
    <Text style={styles.saveButtonText}>Save Settings</Text>
  </TouchableOpacity>
</View>
  );
};
export default SettingsScreen;

  
const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    },
    title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    },
    settingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    },
    settingLabel: {
    fontSize: 18,
    marginRight: 8,
    },
    operandButton: {
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    },
    operandButtonText: {
    fontSize: 18,
    color: "white",
    },
    sliderValue: {
    fontSize: 18,
    marginLeft: 8,
    },
    saveButton: {
    alignSelf: "center",
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    },
    saveButtonText: {
    fontSize: 18,
    color: "white",
    },
    });


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



const SettingsScreen: React.FC<StackScreenProps<RootStackParamList, "Settings">> = ({ navigation }) => {
  const [allowAdd, setAllowAdd] = useState(true);
  const [allowSubtract, setAllowSubtract] = useState(true);
  const [allowMultiply, setAllowMultiply] = useState(false);
  const [allowDivide, setAllowDivide] = useState(false);
  const [allowNegativeNumbers, setAllowNegativeNumbers] = useState(false);
  const [maxTargetNumber, setMaxTargetNumber] = useState(20);
  const [numQuestions, setNumQuestions] = useState(10);
  const [numTries, setNumTries] = useState(3);
  const [unlimitedTries, setUnlimitedTries] = useState(false);
  const [useModifiedScoring, setUseModifiedScoring] = useState(true);


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
      useModifiedScoring,
    });
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

  export default SettingsScreen;
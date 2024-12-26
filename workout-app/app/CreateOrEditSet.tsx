import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const navigateToWorkoutView = () => {
  router.push("/WorkoutView");
};

export default function CreateOrEditSet() {
  // TODO: need to have the current Exercise object we're editing (in order to PUT it) & which set in the exercise to edit
  // TODO: Add validation that exerciseName is not empty
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(100);

  const handleSave = async () => {
    // await putExercise({
    //   title: workoutName,
    //   timestamp: new Date(),
    // })
    navigateToWorkoutView();
  };

  return (
    <>
      <Stack.Screen options={{ title: "create or edit set", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>create set</ThemedText>
          <View style={styles.pickerContainer}>
            <Picker
              style={{flex: 1}}
              selectedValue={reps.toString()}
              onValueChange={(reps: string) => {
                setReps(Number(reps));
              }
              }
              itemStyle={styles.pickerItem}>
              {Array.from({ length: 100 }, (_, index) => index).map((incrementingNum, idx) => (
                <Picker.Item label={incrementingNum.toString()} value={incrementingNum.toString()} key={idx} />
              ))}
            </Picker>
            <ThemedText type="subtitle" style={styles.subtitle}>x</ThemedText>
            <Picker
              style={styles.picker}
              selectedValue={weight.toString()}
              onValueChange={(weight: string) => {
                setWeight(Number(weight));
              }
            }
              itemStyle={styles.pickerItem}>
              {Array.from({ length: 300 }, (_, index) => index * 2.5).map((incrementingNum, idx) => (
                <Picker.Item label={incrementingNum.toString()} value={incrementingNum.toString()} key={idx} />
              ))}
            </Picker>
            <ThemedText type="subtitle" style={styles.subtitle}>lbs</ThemedText>
          </View>
          <Button title="create" onPress={handleSave} /> 
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginTop: 100,
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  picker: {
    flex: 1, // Allow the picker to take up available space
  },
  pickerItem: {
    color: "black"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});
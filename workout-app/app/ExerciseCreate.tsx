import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { putExercise } from "@/scripts/database";
import { useAppContext } from "@/components/AppContext";

const navigateToWorkoutView = () => {
    router.dismiss();
};

export default function ExerciseCreate() {
  // TODO: Add validation that exerciseName is not empty
  const [exerciseName, setExerciseName] = useState("");
  const { currentlyViewedWorkout } = useAppContext();

  const handleSave = async () => {
    if (!exerciseName) {
      Alert.alert("error", "enter a name for the exercise");
      return;
    }

    // Handle save logic here
    await putExercise({
      name: exerciseName,
      reps: [],
      weights: [],
      workout_id: currentlyViewedWorkout.id,
      created_at: new Date(),
    })
    navigateToWorkoutView();
  };

  return (
    <>
      <Stack.Screen options={{ title: "create exercise", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>create exercise</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>name</ThemedText>
          <TextInput
            style={styles.input}
            value={exerciseName}
            onChangeText={(text: string) => setExerciseName(text.toLowerCase())}
            />
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
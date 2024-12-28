import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { putWorkout, Workout } from "@/scripts/database";
import { Picker } from "@react-native-picker/picker";
import { useAppContext } from "@/components/AppContext";

const navBack = () => {
  router.dismiss();
};

function TemplateWorkoutPicker(
  selectedTemplateWorkoutId: number,
  setSelectedTemplateWorkoutId: React.Dispatch<React.SetStateAction<number>>,
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>, 
  workouts: Workout[]
) {

  return (
    <>
      <ThemedText type="subtitle" style={styles.subtitle}>template from</ThemedText>
      <Picker
        selectedValue={selectedTemplateWorkoutId.toString()}
        onValueChange={(selectedWorkoutId: string) => {
          setSelectedTemplateWorkoutId(Number(selectedWorkoutId));
          setWorkoutName(workouts.find((workout) => Number(workout.id) === Number(selectedWorkoutId))?.title || "");
        }
        }
        itemStyle={styles.pickerItem}>
        <Picker.Item label="None" value="-1" />
        {workouts.map((workout, idx) => (
          <Picker.Item label={`${workout.title} - ${workout.timestamp.toDateString()}`} value={workout.id.toString()} key={idx} />
        ))}
      </Picker>
    </>
  );
}

export default function WorkoutCreate() {
  // TODO: Add validation that workoutName is not empty
  const [workoutName, setWorkoutName] = useState("");
  const [selectedTemplateWorkoutId, setSelectedTemplateWorkoutId] = useState(-1);
  const { workouts } = useAppContext();

  const handleSave = async () => {
    await putWorkout({
      title: workoutName,
      timestamp: new Date(),
    })
    navBack();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <Stack.Screen options={{ title: "create workout", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>create workout</ThemedText>
          { workouts.length > 0 ? TemplateWorkoutPicker(selectedTemplateWorkoutId, setSelectedTemplateWorkoutId, setWorkoutName, workouts) : null }
          <ThemedText type="subtitle" style={styles.subtitle}>name</ThemedText>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={(text: string) => setWorkoutName(text.toLowerCase())}
          />
          <Button title="create" onPress={handleSave} /> 
        </ScrollView>
      </ThemedView>
      </KeyboardAvoidingView>
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
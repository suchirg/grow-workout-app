import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { putWorkout } from "@/scripts/database";
import { Picker } from "@react-native-picker/picker";
import { useWorkoutContext } from "@/components/WorkoutContext";

const viewFeed = () => {
  router.push("/Feed");
};

export default function WorkoutCreate() {
  // TODO: Add validation that workoutName is not empty
  const [workoutName, setWorkoutName] = useState("");
  const [selectedTemplateWorkoutId, setSelectedTemplateWorkoutId] = useState(-1);
  const { workouts } = useWorkoutContext();

  const handleSave = async () => {
    // Handle save logic here
    await putWorkout({
      title: workoutName,
      timestamp: new Date(),
    })
    // Navigate to Feed after saving
    viewFeed();
  };

  return (
    <>
      <Stack.Screen options={{ title: "create workout", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>create workout</ThemedText>
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
          <ThemedText type="subtitle" style={styles.subtitle}>workout name</ThemedText>
          <TextInput
            style={styles.input}
            value={workoutName}
            onChangeText={setWorkoutName}
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
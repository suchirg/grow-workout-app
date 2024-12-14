import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, Button, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { putWorkout } from "@/scripts/database";

const viewFeed = () => {
  router.push("/Feed");
};

export default function WorkoutCreate() {
  const [workoutName, setWorkoutName] = useState("");

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
          <TextInput
            style={styles.input}
            placeholder="enter workout name"
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});
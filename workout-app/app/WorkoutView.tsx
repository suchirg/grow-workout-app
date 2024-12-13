import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Sets } from "@/components/Set";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import ColorfulBox from "@/components/ColorfulBox";
import { getWorkouts } from "@/scripts/database";

const workoutData = {
  id: "f1cc485d-5209-481c-963d-09ac255c0ce8",
  title: "pull day",
  date: new Date(),
  exercises: [
    {
      name: "curls",
      weights: [30, 30, 30],
      repititions: [10, 9, 7]
    },
    {
      name: "squat",
      weights: [160, 170, 170],
      repititions: [12, 10, 10]
    }
  ]
};

const handlePress = () => {
  router.push("/ProgressGraph");
};

export default function WorkoutView() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>{workoutData.title}</ThemedText>
          <ThemedText type="subtitle" style={{ marginBottom: 10}}>{workoutData.date.toDateString()}</ThemedText>
          {workoutData.exercises.map((exercise) => (
            <ColorfulBox style={{backgroundColor: "#ff9a85", marginBottom: 15}} handlePress={handlePress}>
              <ThemedText style={ {paddingTop: 10, paddingLeft: 10} }>
                {exercise.name}
              </ThemedText>
              <Sets reps={exercise.repititions} weights={exercise.weights}/>
            </ColorfulBox>
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  exerciseFormatting: {
    paddingTop: 10,
    paddingLeft: 20
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#FFFFFF', // Black color for the divider
    marginVertical: 1, // Space above and below the divider
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginTop: 100,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

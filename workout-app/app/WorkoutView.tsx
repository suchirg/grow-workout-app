import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Set } from "@/components/Set";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Exercise as ExerciseComponent } from "@/components/Exercise";
import React from "react";

type Exercise = {
  name: string;
  /**
   * assume weight is in lbs
   * optional because some exercises don't need a weight specifier (e.g. pullups)
   */
  weights?: number[];
  repititions: number[];
}

type Workout = {
  id: string;
  title: string;
  date: Date;
  exercises: Exercise[];
}

const workoutData: Workout = {
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

export default function WorkoutView() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>{workoutData.title}</ThemedText>
          <ThemedText type="subtitle">{workoutData.date.toDateString()}</ThemedText>
          <View style={styles.exerciseBox}>
              <View style={styles.exerciseFormatting}>
                <ThemedText style={ {paddingBottom: 10} }>
                  bicep curls
                </ThemedText>
                <Set reps={workoutData.exercises[0].repititions} weights={workoutData.exercises[0].weights}/>
              </View>
          </View>
          {workoutData.exercises.map((exercise, idx) => (
            <ExerciseComponent key={idx} exerciseName={exercise.name} weights={exercise.weights} reps={exercise.repititions} />
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  exerciseBox: {
    height: 150,
    width: '100%',
    backgroundColor: '#ff9a85',
    borderWidth: 5,
    borderColor: '#000',
  },
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

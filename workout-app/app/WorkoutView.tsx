import { Link, Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Exercise as ExerciseComponent } from "@/components/Exercise";

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
  title: string;
  date: Date;
  exercises: Exercise[];
}

const workoutData: Workout = {
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
        <ScrollView>
          <ThemedText type="title" style={styles.title}>{workoutData.title}</ThemedText>
          <ThemedText type="subtitle">{workoutData.date.toDateString()}</ThemedText>
          {workoutData.exercises.map((exercise) => (
            <ExerciseComponent exerciseName={exercise.name} weights={exercise.weights} reps={exercise.repititions} />
          ))}
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
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

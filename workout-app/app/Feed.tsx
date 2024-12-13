import { Workout } from "@/components/Workout";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, StyleSheet } from "react-native";
import { MuscleWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

const workouts = [
  {
    id: "1",
    title: "Morning Yoga",
    subtitle: "30 mins",
    description: "A relaxing morning yoga session",
  },
  {
    id: "2",
    title: "HIIT Cardio",
    subtitle: "45 mins",
    description: "High-intensity interval training",
  },
  {
    id: "3",
    title: "Strength Training",
    subtitle: "1 hour",
    description: "Full-body strength training workout",
  },
];

export default function Feed() {
  return (
    <>
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={{paddingTop:100}}>
          <ThemedText type="title">
            GROW
          </ThemedText>
          {workouts.map((workout, index) => (
            <Workout style={styles.workout}
              key={index}
              title={workout.title}
              subtitle={workout.subtitle}
              description={workout.description}
            />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
    workout: {
      paddingTop: 20,
    },
    container: {
      flex: 1,
      alignItems: "center"
    },
});

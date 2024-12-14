import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Sets } from "@/components/Set";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import ColorfulBox from "@/components/ColorfulBox";
import { Exercise } from "@/scripts/database";

const handlePress = () => {
  router.push("/ProgressGraph");
};

export default function WorkoutView() {
  // get workout information from props (title, timestamp)

  // get exercises for workout from db
  const exercisesFromDb: Exercise[] = [
    {
      id: 7, 
      name: "bench press",
      reps: [10, 9, 10],
      weights: [100, 105, 95],
      workout_id: 3
    },
    {
      id: 7, 
      name: "bench press",
      reps: [10, 9, 10],
      weights: [100, 105, 95],
      workout_id: 3
    },
    {
      id: 7, 
      name: "bench press",
      reps: [10, 9, 10],
      weights: [100, 105, 95],
      workout_id: 3
    },
  ];

  const [ exercises, setExercises ] = useState(exercisesFromDb);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <ThemedText type="title" style={styles.title}>{"pull day"}</ThemedText>
          <ThemedText type="subtitle" style={{ marginBottom: 10}}>{(new Date()).toDateString()}</ThemedText>
          {exercises.map((_, idx) => (
            <ColorfulBox key={idx} style={{backgroundColor: "#ff9a85", marginBottom: 15}} handlePress={handlePress}>
              <ThemedText style={ {paddingTop: 10, paddingLeft: 10} }>
                {exercises[idx].name}
              </ThemedText>
              <Sets exercises={exercises} exerciseIdx={idx} setExercises={setExercises}/>
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

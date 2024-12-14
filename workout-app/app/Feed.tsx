import { Workout } from "@/components/Workout";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Workout as WorkoutType } from "@/scripts/database";
import ColorfulBox from "@/components/ColorfulBox";
import { router } from "expo-router";

const workouts: WorkoutType[] = [
  {
    id: "1",
    title: "pull day",
    timestamp: new Date(),
  },
  {
    id: "2",
    title: "push day",
    timestamp: new Date(),
  },
  {
    id: "3",
    title: "leg day",
    timestamp: new Date(),
  },
];

const viewWorkout = (): void => {
  router.push("/WorkoutView");
};

const createWorkout = (): void => {
  router.push("/WorkoutCreate");
};

export default function Feed() {
  return (
    <>
    <ThemedView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <ThemedView style={{paddingTop:100, width:"80%"}}>
          <ThemedText type="title">
            grow
          </ThemedText>
          {workouts.map((workout, idx) => (
            <ColorfulBox key={idx} style={{backgroundColor: "#fcf45d", marginTop: 15, paddingLeft:10, paddingTop: 10, paddingBottom: 10}} handlePress={viewWorkout}>
              <Workout style={styles.workout}
                key={idx}
                title={workout.title}
                timestamp={workout.timestamp}
              />
            </ColorfulBox>
          ))}
          <ColorfulBox style={{ backgroundColor: "#fcf45d", marginTop: 15, paddingBottom:10, paddingTop:10 }} handlePress={createWorkout}>
            <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
          </ColorfulBox>
        </ThemedView>
      </ScrollView>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
    workout: {
      paddingTop: 20,
    }
});

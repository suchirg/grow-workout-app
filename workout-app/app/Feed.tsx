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

const handlePress = () => {
  router.push("/WorkoutView");
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
            <ColorfulBox key={idx} style={{backgroundColor: "#fcf45d", marginTop: 15, paddingLeft:10, paddingTop: 10, paddingBottom: 10}} handlePress={handlePress}>
              <Workout style={styles.workout}
                key={idx}
                title={workout.title}
                timestamp={workout.timestamp}
              />
            </ColorfulBox>
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
    }
});

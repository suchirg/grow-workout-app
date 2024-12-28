import { Workout } from "@/components/Workout";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { getWorkouts, Workout as WorkoutType } from "@/scripts/database";
import ColorfulBox from "@/components/ColorfulBox";
import { router, useFocusEffect } from "expo-router";
import { useAppContext } from "@/components/AppContext";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

const viewWorkout = async (workout: WorkoutType, setCurrentlyViewedWorkout: React.Dispatch<React.SetStateAction<WorkoutType>>) => {
  setCurrentlyViewedWorkout(workout);
  router.push("/WorkoutView");
};

const createWorkout = (): void => {
  router.push("/WorkoutCreate");
};

export default function Feed() {
  const { workouts, setWorkouts, setCurrentlyViewedWorkout } = useAppContext();

  const fetchWorkouts = async () => {
    const data = await getWorkouts();
    setWorkouts(data);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWorkouts();
    }, [])
  );

  return (
    <>
    <ThemedView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <ThemedView style={{paddingTop:100, width:"80%"}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <ThemedText type="title">
              grow
            </ThemedText>
            <ColorfulBox childrenStyle={{ backgroundColor: "#c7e7f2", alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} handlePress={createWorkout}>
              <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
            </ColorfulBox>
          </View>

          { workouts.length > 0 ? 
            workouts.map((workout, idx) => (
              <ColorfulBox key={idx} childrenStyle={{backgroundColor: "#31c1f5", marginTop: 15, padding:10 }} handlePress={() => {viewWorkout(workout, setCurrentlyViewedWorkout)}}>
                <Workout style={styles.workout}
                  key={idx}
                  id={workout.id}
                  title={workout.title}
                  timestamp={workout.timestamp}
                  setWorkouts={setWorkouts}
                />
              </ColorfulBox>
            )) : (
              <>
                <ThemedText style={{ alignSelf: 'center', paddingTop: 50 }} type="default">no workouts yet</ThemedText>
                <ThemedText style={{ alignSelf: 'center' }} type="default">press + to get started</ThemedText>
              </>
            )
          }

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

import { Workout } from "@/components/Workout";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect } from "react";
import { getWorkouts, Workout as WorkoutType } from "@/scripts/database";
import ColorfulBox from "@/components/ColorfulBox";
import { router } from "expo-router";
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

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkouts();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
    <ThemedView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <ThemedView style={{paddingTop:100, width:"80%"}}>
          <ThemedText type="title">
            grow
          </ThemedText>
          {workouts.map((workout, idx) => (
            <ColorfulBox key={idx} childrenStyle={{backgroundColor: "#fcf45d", marginTop: 15, paddingLeft:10, paddingTop: 10, paddingBottom: 10, paddingRight:10 }} handlePress={() => {viewWorkout(workout, setCurrentlyViewedWorkout)}}>
              <Workout style={styles.workout}
                key={idx}
                id={workout.id}
                title={workout.title}
                timestamp={workout.timestamp}
                setWorkouts={setWorkouts}
              />
            </ColorfulBox>
          ))}
          <ColorfulBox childrenStyle={{ backgroundColor: "#fcf45d", marginTop: 15, paddingBottom:10, paddingTop:10 }} handlePress={createWorkout}>
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

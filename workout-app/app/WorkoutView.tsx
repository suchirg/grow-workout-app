import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Sets, showCreateOrEditSet } from "@/components/Set";

import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import ColorfulBox from "@/components/ColorfulBox";
import { Exercise, getExercises, Workout } from "@/scripts/database";
import { useAppContext } from "@/components/WorkoutContext";

const showProgress = () => {
  router.push("/ProgressGraph");
};

const createExercise = () => {
  router.push("/ExerciseCreate");
};

export default function WorkoutView() {
  const {currentlyViewedWorkout } = useAppContext();
  let fetchedExercises: Exercise[] = [];

  // get exercises for workout from db
  useEffect(() => {
    const fetchWorkouts = async () => {
      fetchedExercises = await getExercises(currentlyViewedWorkout.id);
    };

    fetchWorkouts();
  }, []);

  const [ exercises, setExercises ] = useState(fetchedExercises);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 100, marginBottom: 10}}>
            <View>
              <ThemedText type="title">{currentlyViewedWorkout.title}</ThemedText>
              <ThemedText type="subtitle" style={{ marginBottom: 10}}>{currentlyViewedWorkout.timestamp.toDateString()}</ThemedText>
            </View>
            <ColorfulBox childrenStyle={{backgroundColor: "#D3D3D3", alignItems: 'center', justifyContent: 'center', height: 50, width: 50}} handlePress={createExercise}>
              <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
            </ColorfulBox>
          </View>
          {exercises.map((_, idx) => (
            <ColorfulBox key={idx} childrenStyle={{backgroundColor: "#D3D3D3", marginBottom: 15}} handlePress={showProgress}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 8}}>
                <View>
                  <ThemedText style={{fontSize: 26}}>
                    {exercises[idx].name}
                  </ThemedText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ThemedText style={{marginRight: 5, fontSize: 16}}>
                      view progress 
                    </ThemedText>
                    <Icon name="angle-double-right" size={20} color="#000" />
                  </View>
                </View>
                <ColorfulBox childrenStyle={{backgroundColor: "#fc8383", alignItems: 'center', justifyContent: 'center', height: 50, width: 50}} handlePress={showCreateOrEditSet}>
                  <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
                </ColorfulBox>
              </View>
              <View style={{alignItems: 'center'}}>
                <Sets exercises={exercises} exerciseIdx={idx} setExercises={setExercises}/>
              </View>
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
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

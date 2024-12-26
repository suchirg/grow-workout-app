import { router, Stack } from "expo-router";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Sets, showCreateOrEditSet } from "@/components/Set";

import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import ColorfulBox from "@/components/ColorfulBox";
import { deleteExercise, Exercise, getExercises, Workout } from "@/scripts/database";
import { useAppContext } from "@/components/AppContext";

const showProgress = () => {
  router.push("/ProgressGraph");
};

const createExercise = () => {
  router.push("/ExerciseCreate");
};


export default function WorkoutView() {
  const {currentlyViewedWorkout } = useAppContext();
  
  // get exercises for workout from db
  useEffect(() => {
    const fetchWorkouts = async () => {
      setExercises(await getExercises(currentlyViewedWorkout.id));
    };

    fetchWorkouts();
  }, []);

  const [ exercises, setExercises ] = useState<Exercise[]>([]);

  const handleDelete = async (exerciseId: string) => {
    Alert.alert('delete exercise?', 'this action is not reversible', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {text: 'delete', style: 'destructive', onPress: async () => {
        await deleteExercise(exerciseId);
        setExercises((prev: Exercise[]) => prev.filter((workout: Exercise) => workout.id !== exerciseId));
      }},
    ]);
  }
  

  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <ThemedView style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 100, marginBottom: 10}}>
            <View>
              <ThemedText type="title">{currentlyViewedWorkout.title}</ThemedText>
              <ThemedText type="subtitle" style={{ marginBottom: 10 }}>{currentlyViewedWorkout.timestamp.toDateString()}</ThemedText>
            </View>
            <ColorfulBox childrenStyle={{backgroundColor: "#c7e7f2", alignItems: 'center', justifyContent: 'center', height: 50, width: 50}} handlePress={createExercise}>
              <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
            </ColorfulBox>
          </View>
          { exercises.length > 0 ? 
          ( exercises.map((exercise, idx) => (
            <ColorfulBox key={idx} childrenStyle={{backgroundColor: "#FFFFFF", marginBottom: 15}} handlePress={showProgress}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 8}}>
                <View>
                  <ThemedText type="subtitle">
                    {exercises[idx].name}
                  </ThemedText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <ThemedText style={{marginRight: 5}}>
                      view progress 
                    </ThemedText>
                    <Icon name="angle-double-right" size={16} color="#000" />
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <ColorfulBox childrenStyle={{backgroundColor: "#31c1f5", alignItems: 'center', justifyContent: 'center', height: 50, width: 50}} handlePress={() => showCreateOrEditSet(exercise, -1)}>
                    <ThemedText style={{textAlign: 'center'}} type={'title'}>+</ThemedText>
                  </ColorfulBox>
                  <ColorfulBox childrenStyle={{backgroundColor: "#595959", alignItems: 'center', justifyContent: 'center', height: 50, width: 50}} handlePress={() => {handleDelete(exercise.id)}}>
                    <Icon name="trash" size={15} color="#fff" />
                  </ColorfulBox>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Sets exercises={exercises} exerciseIdx={idx} setExercises={setExercises}/>
              </View>
            </ColorfulBox>
          ))) : (
            <>
              <ThemedText style={{ alignSelf: 'center', paddingTop: 50 }} type="default">no exercises yet</ThemedText>
              <ThemedText style={{ alignSelf: 'center' }} type="default">press + to get started</ThemedText>
            </>
          )}
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
  iconButton: {
    padding: 10,
    backgroundColor: '#595959',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
});

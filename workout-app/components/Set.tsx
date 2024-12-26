import { Alert, StyleSheet, TouchableOpacity, View  } from 'react-native';
import { ThemedText } from "./ThemedText";
import { Exercise, putExercise } from "@/scripts/database";
import ColorfulBox from './ColorfulBox';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

// if the user is creating a set, setNumber is -1, otherwise it's the index of the set in the exercise
export const showCreateOrEditSet = (exercise: Exercise, setNumber: number) => {
  router.push(`/CreateOrEditSet?exercise=${JSON.stringify(exercise)}&setNumber=${setNumber}`);
};

type SetProps = {
  exercises: Exercise[];
  exerciseIdx: number;
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

enum WorkoutMetrics {
  REPS = "reps",
  WEIGHTS = "weights",
}

export function Sets({
  exercises,
  exerciseIdx,
  setExercises
}: SetProps) {
  const handleDelete = async (exercise: Exercise, setNumberBeingDeleted: number) => {
    Alert.alert('delete set?', 'this action is not reversible', [
      {
        text: 'cancel',
        style: 'cancel',
      },
      {text: 'delete', style: 'destructive', onPress: async () => {
        const newExercise = { ...exercise, reps: exercise.reps.filter((_, idx) => idx !== setNumberBeingDeleted), weights: exercise.weights.filter((_, idx) => idx !== setNumberBeingDeleted) };
        putExercise(newExercise);
        
        const newExercises = [...exercises];
        newExercises[exerciseIdx] = newExercise;
        setExercises(newExercises);
      }},
    ]);
  }
  
  const relevantExercise: Exercise = exercises[exerciseIdx];
  return (
    <>
      { relevantExercise.reps.length > 0 ?
       (relevantExercise.reps.map((repsInCurrSet, setNumber) => (
        <ColorfulBox key={setNumber} childrenStyle={{ flexDirection:'row', backgroundColor: "#31c1f5", justifyContent: 'space-between', alignItems: 'center', padding: 4}} boxStyle={{marginBottom: 8, width:'95%'}} handlePress={() => showCreateOrEditSet(relevantExercise, setNumber)}>
          <ThemedText type="subtitle" style={styles.text}>{`${repsInCurrSet} x ${relevantExercise.weights[setNumber]} lbs`}</ThemedText>
            <TouchableOpacity onPress={() => handleDelete(relevantExercise, setNumber)} style={styles.iconButton}>
              <Icon name="trash" size={15} color="#fff" />
            </TouchableOpacity>
          </ColorfulBox>
        ))) : (
          <View style={{ paddingBottom: 30 }}>
            <ThemedText style={{ alignSelf: 'center', paddingTop: 20 }} type="default">no sets yet</ThemedText>
            <ThemedText style={{ alignSelf: 'center' }} type="default">press + to get started</ThemedText>
          </View>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  repContainer: {
    gap: 8,
  },
  text: {
    paddingLeft: 10
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

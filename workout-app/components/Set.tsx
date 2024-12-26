import { StyleSheet, View  } from 'react-native';
import { ThemedText } from "./ThemedText";
import { Exercise } from "@/scripts/database";
import ColorfulBox from './ColorfulBox';
import { router } from 'expo-router';
import React from 'react';
import { showCreateOrEditSet } from '@/app/WorkoutView';

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
  const relevantExercise: Exercise = exercises[exerciseIdx];
  return (
    <>
      {relevantExercise.reps.map((repsInCurrSet, setNumber) => (
        <ColorfulBox key={setNumber} childrenStyle={{ backgroundColor: "#fc8383", alignItems: 'center', padding: 4}} boxStyle={{marginBottom: 8, width:'95%'}} handlePress={showCreateOrEditSet}>
          <ThemedText style={styles.text}>{`${repsInCurrSet} x ${relevantExercise.weights[setNumber]} lbs`}</ThemedText>
        </ColorfulBox>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  repContainer: {
    gap: 8,
  },
  text: {
    fontSize: 20,
  }
});

import { Alert, StyleSheet, TouchableOpacity  } from 'react-native';
import { ThemedText } from "./ThemedText";
import { Exercise } from "@/scripts/database";
import ColorfulBox from './ColorfulBox';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

export const showCreateOrEditSet = () => {
  router.push("/CreateOrEditSet");
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

const handleDelete = async () => {
  Alert.alert('delete set?', 'this action is not reversible', [
    {
      text: 'cancel',
      style: 'cancel',
    },
    {text: 'delete', style: 'destructive', onPress: async () => {
      // delete set in db and update state
    }},
  ]);
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
        <ColorfulBox key={setNumber} childrenStyle={{ flexDirection:'row', backgroundColor: "#fc8383", justifyContent: 'space-between', alignItems: 'center', padding: 4}} boxStyle={{marginBottom: 8, width:'95%'}} handlePress={showCreateOrEditSet}>
          <ThemedText style={styles.text}>{`${repsInCurrSet} x ${relevantExercise.weights[setNumber]} lbs`}</ThemedText>
          <TouchableOpacity onPress={() => handleDelete()} style={styles.iconButton}>
            <Icon name="trash" size={15} color="#fff" />
          </TouchableOpacity>
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
    fontSize: 24,
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

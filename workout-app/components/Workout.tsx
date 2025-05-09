import { StyleSheet, useColorScheme, TouchableOpacity, View, GestureResponderEvent, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteExercise, deleteWorkout, getExercises } from "@/scripts/database";
import { Workout as WorkoutType } from "@/scripts/database";


type WorkoutProps = {
  id: string;
  title: string;
  timestamp: Date;
  setWorkouts: React.Dispatch<React.SetStateAction<any>>;
  style?: Record<string, any>;
};

const handleDelete = async (workoutId: string, setWorkouts: React.Dispatch<React.SetStateAction<any>>) => {
  Alert.alert('delete workout?', 'this action is not reversible', [
    {
      text: 'cancel',
      style: 'cancel',
    },
    {text: 'delete', style: 'destructive', onPress: async () => {
      const exercisesInDeletedWorkout = await getExercises(workoutId);
      exercisesInDeletedWorkout.forEach(async (exercise) => {
        await deleteExercise(exercise.id);
      }); 
      await deleteWorkout(workoutId);
      
      setWorkouts((prev: WorkoutType[]) => prev.filter((workout: WorkoutType) => workout.id !== workoutId));
    }},
  ]);
}

export function Workout({
  id,
  title,
  timestamp,
  setWorkouts
}: WorkoutProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <View style={styles.heading}>
        <View>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText type="default">{timestamp.toDateString()}</ThemedText>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleDelete(id, setWorkouts)} style={styles.iconButton}>
            <Icon name="trash" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  iconButton: {
    padding: 12,
    backgroundColor: '#595959',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#000',
  },
});

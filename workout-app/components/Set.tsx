import { StyleSheet, View, TouchableOpacity, PanResponder, Text } from 'react-native';
import { ThemedText } from "./ThemedText";
import { Exercise } from "@/scripts/database";

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

  const createPanResponder = (setNumber: number, repsOrWeights: WorkoutMetrics) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newValue = relevantExercise[repsOrWeights][setNumber] + Math.round(gestureState.dy / 10);
        
        const updatedExercises = JSON.parse(JSON.stringify(exercises));
        updatedExercises[exerciseIdx][repsOrWeights][setNumber] = newValue > 0 ? newValue : 0; // Ensure value is not negative

        setExercises(updatedExercises);
      },
    });
  };


  return (
    <View style={styles.repContainer}>
      {relevantExercise.reps.map((repsInCurrSet, setNumber) => (
        <View key={setNumber} style={styles.repContainer}>
          <View style={styles.divider} />
          <ThemedText style={ {paddingTop: 10, paddingLeft: 10} }>{`${repsInCurrSet} reps x ${relevantExercise.weights[setNumber]} lbs`}</ThemedText>
          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.box} {...createPanResponder(setNumber, WorkoutMetrics.REPS).panHandlers}>
              <Text style={styles.boxText}>R</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} {...createPanResponder(setNumber, WorkoutMetrics.WEIGHTS).panHandlers}>
              <Text style={styles.boxText}>W</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  divider: {
    height: 2.5,
    width: '100%',
    backgroundColor: '#000', // Black color for the divider
    marginTop: 5,
  },
  repContainer: {
    gap: 8,
    marginBottom: 8,
  },
  boxContainer: {
    position: 'absolute',
    right: 20, // 20px from the right end
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    top: 15
  },
  boxText: {
    color: 'white',
    fontSize: 20,
    top: 7.5
  },
});

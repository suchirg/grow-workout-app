import { router } from "expo-router";

import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type ExerciseProps = {
  exerciseName: string;
  reps: number[];
  weights?: number[];
};

const handlePress = () => {
  router.push("/ProgressGraph");
};

export function Exercise({
  exerciseName,
  reps,
  weights,
}: ExerciseProps) {
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.heading}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{exerciseName}</ThemedText>
          {reps.map((rep, idx) => (
            <ThemedText>{`Set ${idx + 1} -- weight: ${weights ? weights[idx] : ""}, reps: ${rep}`}</ThemedText>
          ))}
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

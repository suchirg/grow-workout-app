import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type SetProps = {
  reps: number[];
  weights?: number[];
};

export function Set({
  reps,
  weights,
}: SetProps) {
  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.stepContainer}>
          {reps.map((rep, idx) => (
            <View>
                <ThemedText key={idx}>{`${rep} reps ${weights ? `x ${weights[idx]} lbs` : ""}`}</ThemedText>
                <View style={styles.divider} /> {/* Horizontal line (divider) */}
            </View>
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
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#000', // Black color for the divider
    marginVertical: 5, // Space above and below the divider
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

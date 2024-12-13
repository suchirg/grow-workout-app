import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

type SetProps = {
  reps: number[];
  weights?: number[];
};

export function Sets({
  reps,
  weights,
}: SetProps) {
  return (
    <View style={styles.repContainer}>
      {reps.map((rep, idx) => (
        <View key={idx} style={styles.repContainer}>
          <ThemedText>{`${rep} reps ${weights ? `x ${weights[idx]} lbs` : ""}`}</ThemedText>
          <View style={styles.divider} />
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
    height: 1,
    width: '100%',
    backgroundColor: '#000', // Black color for the divider
    marginVertical: 5, // Space above and below the divider
  },
  repContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

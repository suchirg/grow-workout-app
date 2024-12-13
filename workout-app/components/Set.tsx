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
          <View style={styles.divider} />
          <ThemedText style={ {paddingTop: 10, paddingLeft: 10} }>{`${rep} reps ${weights ? `x ${weights[idx]} lbs` : ""}`}</ThemedText>
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
});

import { router } from "expo-router";

import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type WorkoutProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  style?: Record<string, any>;
};

const handlePress = () => {
  router.push("/WorkoutView");
};

export function Workout({
  id = "Default Id",
  title = "Default Title",
  subtitle = "Default Subtitle",
  description = "Default Description",
  style = {}
}: WorkoutProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={style}>
      <TouchableOpacity
        onPress={handlePress}
        style={styles.heading}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText type="defaultSemiBold">{subtitle}</ThemedText>
          <ThemedText>{description}</ThemedText>
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

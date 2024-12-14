import { router } from "expo-router";

import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

type WorkoutProps = {
  title: string;
  timestamp: Date;
  style?: Record<string, any>;
};

export function Workout({
  title = "Default Title",
  timestamp,
  style = {}
}: WorkoutProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText>{timestamp.toDateString()}</ThemedText>
    </>
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

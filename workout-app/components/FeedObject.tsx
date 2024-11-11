// FeedObject.tsx

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router"; // Use this to navigate

type FeedObjectProps = {
  title: string;
  subtitle: string;
  description: string;
  id: string; // Add ID to uniquely identify each item
};

export function FeedObject({
  title,
  subtitle,
  description,
  id,
}: FeedObjectProps) {
  const router = useRouter(); // Hook for navigation

  const handlePress = () => {
    // Navigate to the Detail page and pass the data as params
    router.push({
      pathname: "/FeedDetail",
      params: { title, subtitle, description }, // Passing the workout data
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText type="defaultSemiBold">{subtitle}</ThemedText>
        <ThemedText>{description}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

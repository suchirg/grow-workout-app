// FeedDetail.tsx

import { useLocalSearchParams } from "expo-router";

import React from "react";
import { View, Text, StyleSheet } from "react-native";
export function FeedDetail() {
  const { id, title, subtitle, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed Detail for ID: {id}</Text>
      {/* Add more detailed content based on the ID */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

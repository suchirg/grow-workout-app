import { Image, StyleSheet, Platform } from "react-native";
import { Link, Stack } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import Feed from "./Feed";

const workouts = [
  {
    title: "Morning Yoga",
    subtitle: "30 mins",
    description: "A relaxing morning yoga session",
  },
  {
    title: "HIIT Cardio",
    subtitle: "45 mins",
    description: "High-intensity interval training",
  },
  {
    title: "Strength Training",
    subtitle: "1 hour",
    description: "Full-body strength training workout",
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Feed />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

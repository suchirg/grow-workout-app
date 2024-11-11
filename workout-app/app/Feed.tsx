import { FeedObject } from "@/components/FeedObject";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";

const workouts = [
  {
    id: "1",
    title: "Morning Yoga",
    subtitle: "30 mins",
    description: "A relaxing morning yoga session",
  },
  {
    id: "2",
    title: "HIIT Cardio",
    subtitle: "45 mins",
    description: "High-intensity interval training",
  },
  {
    id: "3",
    title: "Strength Training",
    subtitle: "1 hour",
    description: "Full-body strength training workout",
  },
];

export default function Feed() {
  return (
    <>
      <ThemedText type="title">
        Workout Feed <HelloWave />
      </ThemedText>
      {workouts.map((workout, index) => (
        <FeedObject
          key={index}
          title={workout.title}
          subtitle={workout.subtitle}
          description={workout.description}
        />
      ))}
    </>
  );
}

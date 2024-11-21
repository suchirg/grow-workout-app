import { Workout } from "@/components/Workout";
import { ThemedText } from "@/components/ThemedText";
import { MuscleWave } from "@/components/HelloWave";

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
        Workout Feed <MuscleWave />
      </ThemedText>
      {workouts.map((workout, index) => (
        <Workout
          key={index}
          title={workout.title}
          subtitle={workout.subtitle}
          description={workout.description}
        />
      ))}
    </>
  );
}

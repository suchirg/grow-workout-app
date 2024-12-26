import { Workout } from '@/scripts/database';
import React, { createContext, useState, useContext } from 'react';

type ContextProviderProps = {
    children: React.ReactNode;
}

export type AppContextType = {
    workouts: Workout[];
    setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
    currentlyViewedWorkout: Workout;
    setCurrentlyViewedWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    currentlyViewedExerciseId: ExerciseId;
    setCurrentlyViewedExerciseId: React.Dispatch<React.SetStateAction<ExerciseId>>;
}

type ExerciseId = string;

// workouts state for the Feed & WorkoutCreate screens
// currently viewed workout state (for the WorkoutView screen)
// currently viewed exercise state (for the ProgressGraph screen)

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: ContextProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentlyViewedWorkout, setCurrentlyViewedWorkout] = useState<Workout>({
    id: "",
    title: "",
    timestamp: new Date(),
  });
  const [currentlyViewedExerciseId, setCurrentlyViewedExerciseId] = useState<ExerciseId>("");
  
  return (
    <AppContext.Provider value={{ workouts, setWorkouts, currentlyViewedWorkout, setCurrentlyViewedWorkout, currentlyViewedExerciseId, setCurrentlyViewedExerciseId }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = (): AppContextType => {
  let context;
  try {
    context = useContext(AppContext);
  } catch (err) {
    console.log("error", err);
  }
  // console.log("after useContext");
  // if (!context) {
  //   console.log("throwing error");
  //   throw new Error('useContext must be used within a WorkoutProvider');
  // }

  // console.log("returning context", context);
  return context as AppContextType;
}

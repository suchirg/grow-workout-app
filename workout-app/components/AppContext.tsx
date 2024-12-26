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
  
  return (
    <AppContext.Provider value={{ workouts, setWorkouts, currentlyViewedWorkout, setCurrentlyViewedWorkout }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

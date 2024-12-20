import { Workout } from '@/scripts/database';
import React, { createContext, useState, useContext } from 'react';

type WorkoutProviderProps = {
    children: React.ReactNode;
}

export type WorkoutContextType = {
    workouts: Workout[];
    setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const WorkoutProvider = ({ children }: WorkoutProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  
  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
};


export const useWorkoutContext = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useContext must be used within a WorkoutProvider');
  }

  return context;
}

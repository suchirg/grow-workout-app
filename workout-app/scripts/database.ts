import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export type Exercise = {
    id: string;
    name: string;
    reps: number[];
    weights: number[]; // lbs
    workout_id: string;
    created_at: Date;
}

export type Workout = {
    id: string;
    title: string;
    timestamp: Date;
}

// Debugging function to display the state of the database
const debugDatabaseState = async () => {
    const db = await getDatabase();

    try {
        const workouts = await db.getAllAsync<Workout>(`SELECT * FROM workout;`);
        const exercises = await db.getAllAsync<Exercise>(`SELECT * FROM exercise;`);

        console.log("Workouts:");
        workouts.forEach(workout => {
            console.log(`ID: ${workout.id}, Title: ${workout.title}, Timestamp: ${workout.timestamp}`);
        });

        console.log("\nExercises:");
        exercises.forEach(exercise => {
            console.log(`ID: ${exercise.id}, Name: ${exercise.name}, Reps: ${exercise.reps}, Weights: ${exercise.weights}, Workout ID: ${exercise.workout_id}`);
        });
    } catch (error) {
        console.error("Error querying database state:", error);
    }
};

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('workout-app.db');
        await initializeDatabase(db);
    }
    return db;
}

export const initializeDatabase = async (db: SQLite.SQLiteDatabase): Promise<void> => {
    await db.withTransactionAsync(async () => {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS workout (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                timestamp DATETIME NOT NULL
            );
        `)
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                reps TEXT NOT NULL,  -- Store reps as JSON string
                weights TEXT NOT NULL,  -- Store weight as JSON string
                workout_id INTEGER NOT NULL,
                created_at DATETIME NOT NULL,
                FOREIGN KEY (workout_id) REFERENCES workout(id)
            );
        `);
    });
}

export const getWorkouts = async () => {
    const db = await getDatabase();
    const workouts = await db.getAllAsync<Workout>(`
        SELECT * FROM workout;    
    `);

    workouts.forEach((workout) => {
        workout.timestamp = new Date(workout.timestamp);
    })
    
    return workouts;
}

export const deleteWorkout = async (workoutId: string) => {
    const db = await getDatabase();
    return await db.runAsync(`
        DELETE FROM workout WHERE id = ${workoutId};
    `);
}

export const getExercises = async (workoutIdToFilterBy?: string) => {
    const db = await getDatabase();

    const exercises =  workoutIdToFilterBy ? await db.getAllAsync<Exercise>(`
            SELECT * FROM exercise WHERE workout_id = ${workoutIdToFilterBy};
        `) : await db.getAllAsync<Exercise>(`
            SELECT * FROM exercise;
        `)

        exercises.forEach((exercise) => {
            exercise.reps = JSON.parse(exercise.reps as unknown as string);
            exercise.weights = JSON.parse(exercise.weights as unknown as string);
            exercise.created_at = new Date(exercise.created_at);
        });

    return exercises;
}

export const putWorkout = async (workout: Omit<Workout, "id"> & {id?: string}): Promise<SQLite.SQLiteRunResult> => {
    const db = await getDatabase();
    let res; 
    if (!workout.id){
        res = await db.runAsync(
            `INSERT INTO workout (title, timestamp) VALUES (?, ?)`,
            [workout.title, workout.timestamp.toISOString()]
        )
    } else {
        res = await db.runAsync(
            `UPDATE workout SET title = ?, SET timestamp = ? WHERE id = ?`,
            [workout.title, workout.timestamp.toString(), workout.id]
        )
    }
    return res;
}

export const deleteExercise = async (exerciseId: string) => {
    const db = await getDatabase();
    return await db.runAsync(`
        DELETE FROM exercise WHERE id = ${exerciseId};
    `);
}

export const putExercise = async (exercise: Omit<Exercise, "id"> & {id?: string}) => {
    const db = await getDatabase();
    let res;

    if (!exercise.id){
        res = await db.runAsync(
            `INSERT INTO exercise (name, reps, weights, workout_id, created_at) VALUES (?, ?, ?, ?, ?)`,
            [exercise.name, JSON.stringify(exercise.reps), JSON.stringify(exercise.weights), exercise.workout_id, exercise.created_at.toISOString()]
        )
    } else {
        res = await db.runAsync(
            `UPDATE exercise SET name = ?, reps = ?, weights = ?, workout_id = ? WHERE id = ?`,
            [exercise.name, JSON.stringify(exercise.reps), JSON.stringify(exercise.weights), exercise.workout_id, exercise.id]
        )
    }
}

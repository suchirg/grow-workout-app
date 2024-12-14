import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export type Exercise = {
    id: number;
    name: string;
    reps: number[];
    weights: number[]; // lbs
    workout_id: number;
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
                workout_id INTEGER,
                FOREIGN KEY (workout_id) REFERENCES workout(id)
            );
        `);
    });
}

export const getWorkouts = async () => {
    const db = await getDatabase();
    return await db.getAllAsync<Workout>(`
        SELECT * FROM workout;    
    `);
}

export const getExercises = async (workoutIdToFilterBy?: string) => {
    const db = await getDatabase();

    return workoutIdToFilterBy ? await db.getAllAsync<Exercise>(`
        SELECT * FROM exercise WHERE workout_id = ${workoutIdToFilterBy};
    `) : await db.getAllAsync<Exercise>(`
        SELEct * FROM exercise;
    `)
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

export const putExercise = async (exercise: Exercise) => {
    const db = await getDatabase();

    await db.withTransactionAsync(async () => {
        const exerciseExists = await db.getAllAsync<Workout>(`
            SELECT * FROM exercise WHERE id = ${exercise.id}
        `)

        if (exerciseExists.length == 0){
            db.runAsync(
                `INSERT INTO exercise (reps, weights, workout_id) VALUES (?, ?, ?)`,
                [exercise.reps, exercise.weights, exercise.workout_id]
            )
        } else {
            db.runAsync(
                `UPDATE exercise SET reps = ?, SET weights = ?, SET workout_id = ? WHERE id = ?`
                [exercise.reps, exercise.weights, exercise.workout_id, exercise.id]
            )
        }
    })
}

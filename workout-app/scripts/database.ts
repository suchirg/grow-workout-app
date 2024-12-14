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

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
    if (db){
        return db;
    } else {
        const db = await SQLite.openDatabaseAsync('workout-app.db');
        await initializeDatabase(db);
        return db;
    }
};

export const initializeDatabase = async (db: SQLite.SQLiteDatabase) => {
    await db.withTransactionAsync(async () => {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS workout (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                timestamp DATETIME NOT NULL,
            );
        `);
        await db.execAsync(`
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
};

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

export const putWorkout = async (workout: Omit<Workout, "id"> & {id?: string}) => {
    // try to find the workout in the the DB with a getWorkouts call
    // if it exists, update it with the new workout object
    // else, create a new workout with the new workout object
    const db = await getDatabase();

    await db.withTransactionAsync(async () => {
        const workoutExists = await db.getAllAsync<Workout>(`
            SELECT * FROM workout WHERE id = ${workout.id}
        `)

        if (workoutExists.length == 0){
            db.runAsync(
                `INSERT INTO workout (title, timestamp) VALUES (?, ?)`,
                [workout.title, workout.timestamp]
            )
        } else {
            db.runAsync(
                `UPDATE workout SET title = ?, SET timestamp = ? WHERE id = ?`
                [workout.title, workout.timestamp, workout.id]
            )
        }
    })
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

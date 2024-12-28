import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as shape from 'd3-shape';

import * as haptics from 'expo-haptics';
import React, { useEffect, useState } from "react";

import { LineChart } from 'react-native-wagmi-charts';
import ColorfulBox from "@/components/ColorfulBox";
import { Exercise, getExercises } from "@/scripts/database";


function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Soft);
};

function indexToDateString(index: number, buckets: {start: Date; end: Date;}[]) {
    console.log(index, buckets);
    return index === - 1 ? "" : buckets[index].start.toLocaleDateString() + " - " + buckets[index].end.toLocaleDateString();
}

type DataPoint = {
    timestamp: number;
    value: number; // one rep max value
}

export default function ProgressGraph() {
    const { exerciseName } = useLocalSearchParams();
    const [ ormData, setOrmData ] = useState<DataPoint[]>([]);
    const [ dateRangeViewing, setDateRangeViewing ] = useState<string>("");
    const [buckets, setBuckets] = useState<{start: Date; end: Date;}[]>([]);

    useEffect(() => {
        const fetchExercises = async () => {
            const ormData: DataPoint[] = [];
            const exercises: Exercise[] = await getExercises();

            const twelveWeeksAgo = new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000);

            // TODO: fix daylight savings time issue in calcaulating buckets
            const newBuckets = Array.from({ length: 12 }, (_, i) => {
                const start = new Date(twelveWeeksAgo);
                start.setDate(start.getDate() + 7 * i);
                const end = new Date(start);
                end.setDate(end.getDate() + 7);
                return { start, end };
            }); 
            setBuckets(newBuckets);

            exercises.filter(exercise => exercise.name === exerciseName && exercise.created_at >=  new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000));
            
            let exercisesGroupedByWeek: Record<string, Exercise[]> = {};

            newBuckets.forEach(({ start }) => {
                exercisesGroupedByWeek[start.getTime()] = [];
            });
            exercises.forEach((currentExercise) => {
                const { created_at: createdAt } = currentExercise;
                const weekBucketStartTime = (newBuckets.find(({ start, end }) => createdAt >= start && createdAt < end) as { start: Date, end: Date }).start.getTime();
                exercisesGroupedByWeek[weekBucketStartTime].push(currentExercise);
            });

            Object.entries(exercisesGroupedByWeek).forEach(([weekStartTime, exercises]) => {
                let thisWeeks1RM = 0;
                exercises.forEach((exercise) => {
                    exercise.reps.forEach((repsForCurrSet, idx) => {
                        const weightForCurrSet = exercise.weights[idx]; 
                        const thisSets1RM = weightForCurrSet / (1.0278 - 0.0278 * repsForCurrSet);
                        thisWeeks1RM = Math.max(thisWeeks1RM, thisSets1RM);
                    });
                });

                ormData.push({
                    timestamp: Number(weekStartTime),
                    value: thisWeeks1RM,
                });
            });

            setOrmData(ormData);
        }

        fetchExercises();
    }, [exerciseName]);

    return (
        <>
            <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
                <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                    <ThemedText type="title" style={styles.exerciseName}>{exerciseName}</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>{"one rep max progress (lbs)"}</ThemedText>
                    <ThemedText type="subtitle" style={styles.subtitle}>{dateRangeViewing}</ThemedText>
                    <ColorfulBox childrenStyle={{backgroundColor: "#FFFFFF"}} boxStyle={{alignSelf: 'center'}} handlePress={() => {}}>                   
                        {ormData.length > 0 && (
                            <LineChart.Provider data={ormData} onCurrentIndexChange={(index) => {
                                invokeHaptic();
                                setDateRangeViewing(indexToDateString(index, buckets));
                            }}>
                            <LineChart shape={shape.curveLinear} width={Dimensions.get('window').width * 0.9} height={Dimensions.get('window').height * 0.65}>
                                <LineChart.Path color="#31c1f5">
                                <LineChart.Gradient />
                                </LineChart.Path>
                                <LineChart.CursorCrosshair
                                onActivated={invokeHaptic}
                                onEnded={invokeHaptic}
                                snapToPoint={true}
                                >
                                <LineChart.Tooltip
                                    textStyle={{
                                    color: 'black',
                                    fontSize: 18,
                                    fontFamily: 'Barlow',
                                    width: 50,
                                    }}
                                />
                                </LineChart.CursorCrosshair>
                            </LineChart>
                            </LineChart.Provider>
                        )}
                    </ColorfulBox>
                </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    exerciseName: {
        marginLeft: 20,
    },
    subtitle: {
        marginLeft: 20,
        marginBottom: 10,
    },
});

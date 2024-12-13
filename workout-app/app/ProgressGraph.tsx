import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { LineGraph } from "react-native-graph";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Haptics from 'expo-haptics';
import { useState } from "react";

// orm = "one rep max"
type ormChartData = {
    id: string;
    exercise_name: string;
    fields: string[];
    values: number[][];
}

type DataPoint = {
    date: Date;
    value: number;
}

const dataFromApi: ormChartData = {
    id: "f1cc485d-5209-481c-963d-09ac255c0ce8",
    exercise_name: "bicep curls",
    fields: [
        "timestamp",
        "orm"
    ],
    values: [
        [1726191377, 70],
        [1728783377, 72.33],
        [1731461777, 71.94],
        [1734053777, 73]
    ]
}



function reformatChartData(dataFromApi: ormChartData): DataPoint[] {
    const reformattedData = [];
    for (const dataPoint of dataFromApi.values){
        reformattedData.push({
            date: new Date(dataPoint[0]),
            value: dataPoint[1]
        });
    }

    return reformattedData;
}

export default function WorkoutView() {
    const DATA = reformatChartData(dataFromApi);
    const graphColor = "#4484B2";

    const [currOrm, setCurrOrm] = useState(DATA[DATA.length - 1]["value"]);

    function updateCurrOrm(newOrm: DataPoint): void {
        setCurrOrm(newOrm.value);
    }

    function resetCurrOrm(): void {
        setCurrOrm(DATA[DATA.length - 1]["value"]);
    }

    return (
        <>
        <GestureHandlerRootView>
            <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
                <ThemedView style={styles.container}>
                    <ThemedText type="title" style={styles.title}>{dataFromApi.exercise_name}</ThemedText>
                    <ThemedText type="subtitle" style={styles.title}>{currOrm}</ThemedText>
                    <LineGraph
                        style={styles.graph}
                        animated={true}
                        enablePanGesture={true}
                        color={graphColor}
                        points={DATA}
                        onGestureStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        onPointSelected={(o) => updateCurrOrm(o)}
                        onGestureEnd={() => resetCurrOrm()}
                    />
                </ThemedView>
        </GestureHandlerRootView>
        </>
    );
}

const styles = StyleSheet.create({
    graph: {
        width: 300,
        height: 500,
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    title: {
        marginTop: 100,
        fontSize: 30
    },
});

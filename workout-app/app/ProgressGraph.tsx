import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as shape from 'd3-shape';

import * as Haptics from 'expo-haptics';
import { useState } from "react";
import React from "react";

import { LineChart } from 'react-native-wagmi-charts';

const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25,
  },
  {
    timestamp: 1625946300000,
    value: 33600.25,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33600.25,
  },
];


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
            <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
                <ThemedView style={styles.container}>
                    <ThemedText type="title" style={styles.title}>{dataFromApi.exercise_name}</ThemedText>
                    <ThemedText type="subtitle" style={styles.title}>{currOrm}</ThemedText>
                    <LineChart.Provider data={data}>
                        <LineChart width={300} height={500} shape={shape.curveLinear}>
                            <LineChart.Path />
                        </LineChart>
                    </LineChart.Provider>
                </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
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

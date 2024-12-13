import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFont } from "@shopify/react-native-skia";
import { CartesianChart, Line } from "victory-native";

import spacemono from '../assets/fonts/SpaceMono-Regular.ttf';

// orm = "one rep max"
type ormChartData = {
    id: string;
    exercise_name: string;
    fields: string[];
    values: number[][];
}

type DataPoint = {
    timestamp: number;
    orm: number;
}

const dataFromApi: ormChartData = {
    id: "f1cc485d-5209-481c-963d-09ac255c0ce8",
    exercise_name: "bicep curls",
    fields: [
        "timestamp",
        "orm"
    ],
    values: [
        [1634044477, 70],
        [1635293049, 72.33],
        [1700000000, 71.94],
        [1734044477, 80]
    ]
}



function reformatChartData(dataFromApi: ormChartData): DataPoint[] {
    const reformattedData = [];
    for (const dataPoint of dataFromApi.values){
        reformattedData.push({
            timestamp: dataPoint[0],
            orm: dataPoint[1]
        });
    }

    return reformattedData;
}

export default function WorkoutView() {
    const DATA = reformatChartData(dataFromApi);

    return (
        <>
        <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
            {/* <ThemedView style={styles.container}> */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>{dataFromApi.exercise_name}</Text>
                <View style={styles.chartContainer}>
                    <CartesianChart data={DATA} xKey="timestamp" yKeys={["orm"]} axisOptions={{font: useFont(spacemono, 12)}}>
                        {({ points }) => (
                            <Line
                                points={points.orm}
                                color="red"
                                strokeWidth={3}
                                animate={{ type: "timing", duration: 300 }}
                            />
                        )}
                    </CartesianChart>
                </View>
            </ScrollView>
            {/* </ThemedView> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 100,
        fontSize: 30
    },
    chartContainer: {
        height: 600, // Ensure the chart has a defined height
        width: '80%',
        padding: 10 
    },
});

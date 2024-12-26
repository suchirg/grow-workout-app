import { Stack } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import * as shape from 'd3-shape';

import * as haptics from 'expo-haptics';
import React from "react";

import { LineChart } from 'react-native-wagmi-charts';
import ColorfulBox from "@/components/ColorfulBox";

const data = [
  {
    timestamp: 1625945400000,
    value: 250,
  },
  {
    timestamp: 1625946300000,
    value: 255,
  },
  {
    timestamp: 1625947200000,
    value: 260,
  },
  {
    timestamp: 1625948100000,
    value: 262,
  },
];

function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}

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

export default function WorkoutView() {    
    return (
        <>
            <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
                <ThemedView style={{ flex: 1, justifyContent: 'center' }}>
                    <ThemedText type="title" style={styles.exerciseName}>{"bicep curls"}</ThemedText>
                    <ThemedText type="title" style={styles.subtitle}>{"one rep max progress"}</ThemedText>
                    <ColorfulBox childrenStyle={{backgroundColor: "#FFFFFF"}} boxStyle={{alignSelf: 'center'}} handlePress={() => {}}>                   
                        <LineChart.Provider data={data}>
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
                                        }}>
                                    </LineChart.Tooltip>
                                </LineChart.CursorCrosshair>
                            </LineChart>
                        </LineChart.Provider>
                    </ColorfulBox>
                </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    exerciseName: {
        marginLeft: 20,
        fontSize: 34
    },
    subtitle: {
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 22
    },
});

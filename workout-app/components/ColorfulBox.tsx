import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import React from "react";

type ColorfulBoxProps = {
    color: string;
    handlePress: (event: GestureResponderEvent) => void;
    children: React.ReactNode;
}

export default function ColorfulBox({ color, handlePress, children }: ColorfulBoxProps){
    return (
        <ThemedView>
            <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            >
                <ThemedView style={ {...styles.exerciseBox, backgroundColor: color} }>
                        {children}
                </ThemedView>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    exerciseBox: {
        height: 150,
        width: '100%',
        backgroundColor: '#ff9a85',
        borderWidth: 5,
        borderColor: '#000',
    },
});
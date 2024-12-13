import { GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import React from "react";

type ColorfulBoxProps = {
    handlePress: (event: GestureResponderEvent) => void;
    style: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

export default function ColorfulBox({ handlePress, style, children }: ColorfulBoxProps){
    return (
        <ThemedView>
            <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            >
                <ThemedView style={ {...styles.exerciseBox, ...StyleSheet.flatten(style)} }>
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
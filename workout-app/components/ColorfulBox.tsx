import { GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import React from "react";

type ColorfulBoxProps = {
    handlePress: (event: GestureResponderEvent) => void;
    childrenStyle: StyleProp<ViewStyle>;
    boxStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}   

export default function ColorfulBox({ handlePress, boxStyle, childrenStyle, children }: ColorfulBoxProps){
    return (
        <ThemedView style={{...StyleSheet.flatten(boxStyle)}}>
            <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            >
                <ThemedView style={ {...styles.exerciseBox, ...StyleSheet.flatten(childrenStyle)} }>
                    {children}
                </ThemedView>
            </TouchableOpacity>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    exerciseBox: {
        width: '100%',
        backgroundColor: '#ff9a85',
        borderWidth: 5,
        borderColor: '#000',
    },
});
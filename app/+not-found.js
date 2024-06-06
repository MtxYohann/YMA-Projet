import {Link, Stack} from "expo-router";
import {StyleSheet, View, Text} from "react-native";

export default function NotFoundScreen() {

    return (
        <>
            <Stack.Screen option={{title: "Oops!"}}/>
            <View>
                <Text>Oops!</Text>
            </View>
        </>
    );
}
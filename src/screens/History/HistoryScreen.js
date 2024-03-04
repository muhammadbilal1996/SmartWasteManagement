import React from "react";
import {StyleSheet, Text, View} from "react-native";

const HistoryScreen = () => {
    return(
        <View style={styles.mainContainer}>
            <Text>History Screen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});
export default HistoryScreen;
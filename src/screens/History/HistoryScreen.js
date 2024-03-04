import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Header from "../../components/Header";

const HistoryScreen = () => {
    return(
        <View style={styles.mainContainer}>
            <Header title={'History'} />
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
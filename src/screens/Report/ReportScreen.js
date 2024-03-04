import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Header from "../../components/Header";

const ReportScreen = () => {
    return(
        <View style={styles.mainContainer}>
            <Header title={'Report'} />
            <Text>ReportScreen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});
export default ReportScreen;
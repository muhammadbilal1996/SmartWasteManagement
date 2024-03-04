import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Header from "../../components/Header";

const ProfileScreen = () => {
    return(
        <View style={styles.mainContainer}>
            <Header title={'Profile'} />
            <Text>ProfileScreen</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});
export default ProfileScreen;
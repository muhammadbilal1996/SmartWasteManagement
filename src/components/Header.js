import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors} from "../utills/Colors";

const header = props => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    }
    return (
        <View style={[styles.mainContainer]}>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleBackPress} style={styles.button}>
                    <Icon name="angle-left" size={24} color="#2C2C2C" />
                </TouchableOpacity>
                <Text style={[styles.title]}>{props.title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 8,
    },
    title: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
        color: '#2C2C2C',
        fontWeight: '600'
    },
    button: {
        padding: 12,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconWrapper: {

        padding: 15,
    },
});
export default header;
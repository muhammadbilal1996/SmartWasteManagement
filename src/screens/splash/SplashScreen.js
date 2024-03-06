import React, {useEffect} from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import constants from '../../constants';
import {Colors} from "../../utills/Colors";


const SplashScreen = ({navigation}) => {
    const isLogIn = async () => {
        return await constants.storage.get('userDetails');
    };
    useEffect(() => {
        isLogIn().then(res => {
            if (res) {
                navigation.replace('MyDrawer');
            } else {
                navigation.replace('SignUpScreen');
            }
        } );
    }, [navigation]);
    return (
        <View  style={styles.mainContainer}>
            <Image
                style={styles.stretch}
                source={require('../../assets/images/logo.png')}
            />
            <Text style={styles.upperText}>Waste Management</Text>
            <Text style={styles.lowerText}>System</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stretch: {
        width: 150,
        height: 150,
        resizeMode: 'stretch',
    },
    upperText: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: 'bold',
        marginTop: 24
    },
    lowerText: {
        fontSize: 20,
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
export default SplashScreen;
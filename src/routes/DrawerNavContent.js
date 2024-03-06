import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import HistoryScreen from "../screens/History/HistoryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors} from "../utills/Colors";
import constants from "../constants";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawerNavContent = props => {
    const [isActive, setIsActive] = useState('HomeScreen');
    const [userDetails, setUserDetails] = useState({});
    const getUserDetails = async () => {
        return await constants.storage.get('userDetails');
    };
    useEffect(() => {
        getUserDetails().then(res => {
            console.log(JSON.stringify(res))
            setUserDetails(res);
        })
    }, []);
    const handleNavigation = route => {
        setIsActive(route);
        props.navigation.navigate(route);
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.drawerIconSection}>
                <Image
                    style={styles.stretch}
                    source={require('../assets/images/avatar.png')}
                />
                <Text
                    style={{
                        fontSize: 15,
                        color: 'black',
                        marginTop: 10,
                        fontFamily: 'Inter-SemiBold',
                    }}>
                    Joen Deo
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        color: 'black',
                        fontFamily: 'Inter-Medium',
                    }}>
                    {userDetails?.user?.email}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                    }}>
                    User Role
                </Text>
            </View>
            <View style={styles.drawerSectionContainer}>
                <TouchableOpacity
                    onPress={() => handleNavigation('HomeScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'HomeScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            ]
                            : styles.screenContainer
                    }>
                    <Icon style={{marginLeft: 8}} name="home" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleNavigation('ProfileScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'ProfileScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            ]
                            : styles.screenContainer
                    }>
                    <Icon style={{marginLeft: 8}} name="user-circle" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>ProfileScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleNavigation('HistoryScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'HistoryScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            ]
                            : styles.screenContainer
                    }>
                    <Icon style={{marginLeft: 8}} name="history" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>HistoryScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleNavigation('BinsStatusScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'BinsStatusScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            ]
                            : styles.screenContainer
                    }>
                    <Icon style={{marginLeft: 8}} name="trash" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>Bins Status</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleNavigation('ReportScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'ReportScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
                            ]
                            : styles.screenContainer
                    }>
                    <Icon style={{marginLeft: 8}} name="exclamation-triangle" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>ReportScreen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        constants.storage.remove('userDetails');
                        props.navigation.replace('SignInScreen')
                    }}
                    activeOpacity={0.8}
                    style={styles.logoutContainer}>
                    <Icon style={{marginLeft: 8}} name="sign-out" size={24} color="#C8C8C8" />
                    <Text style={[styles.screenTitle, {color: 'white', fontSize: 16}]}>Logout</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: undefined,
        height: (windowHeight / 100) * 100,
        backgroundColor:Colors.primary,
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
    },
    drawerIconSection: {
        paddingTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    drawerSectionContainer: {
        flex: 1,
        marginTop: 10,
        flexDirection: 'column',
        marginRight: 15,
    },
    screenContainer: {
        height: (windowHeight / 100) * 6,
        width: (windowWidth / 100) * 65,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        margin: 2,
    },
    screenTitle: {
        fontSize: 14,
        fontFamily: 'DMSans-Medium',
        paddingBottom: 2,
        marginLeft: 12,
    },
    ButtonIconConatiner: {
        padding: 15,
        marginLeft: 10,
    },
    logoutContainer: {
        position: 'absolute',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        bottom: 12,
        height: (windowHeight / 100) * 6,
        width: (windowWidth / 100) * 65,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 2,
        backgroundColor: 'red'
    },
});

export default DrawerNavContent;
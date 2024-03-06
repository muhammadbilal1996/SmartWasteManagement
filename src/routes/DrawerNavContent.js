import React, {useState} from 'react';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DrawerNavContent = props => {
    const [isActive, setIsActive] = useState('HomeScreen');
    const handleNavigation = route => {
        setIsActive(route);
        props.navigation.navigate(route);
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.drawerIconSection}>
                {/*<TouchableOpacity onPress={() => handleNavigation('ProfileActivity')}>*/}
                {/*    <svg.avatar height={100} width={100} />*/}
                {/*</TouchableOpacity>*/}
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
                    joendeo@gmail.com
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
                    {/*<View style={styles.ButtonIconConatiner}>*/}
                    {/*    <svg.homeWhite width={24} height={24} fill={color.white} />*/}
                    {/*</View>*/}
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
                    {/*<View style={styles.ButtonIconConatiner}>*/}
                    {/*    <svg.homeWhite width={24} height={24} fill={color.white} />*/}
                    {/*</View>*/}
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
                    {/*<View style={styles.ButtonIconConatiner}>*/}
                    {/*    <svg.homeWhite width={24} height={24} fill={color.white} />*/}
                    {/*</View>*/}
                    <Icon style={{marginLeft: 8}} name="history" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>HistoryScreen</Text>
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
                    {/*<View style={styles.ButtonIconConatiner}>*/}
                    {/*    <svg.homeWhite width={24} height={24} fill={color.white} />*/}
                    {/*</View>*/}
                    <Icon style={{marginLeft: 8}} name="exclamation-triangle" size={24} color="#C8C8C8" />
                    <Text style={styles.screenTitle}>ReportScreen</Text>
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
});

export default DrawerNavContent;
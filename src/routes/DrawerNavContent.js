import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native';


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
            <View style={styles.drawerSectionContainer}>
                <TouchableOpacity
                    onPress={() => handleNavigation('HomeScreen')}
                    activeOpacity={0.8}
                    style={
                        isActive === 'HomeScreen'
                            ? [
                                styles.screenContainer,
                                {backgroundColor: 'red'},
                            ]
                            : styles.screenContainer
                    }>
                    {/*<View style={styles.ButtonIconConatiner}>*/}
                    {/*    <svg.homeWhite width={24} height={24} fill={color.white} />*/}
                    {/*</View>*/}
                    <Text style={styles.screenTitle}>Dashboard</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: (windowWidth / 100) * 83,
        height: (windowHeight / 100) * 100,
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
    },
    ButtonIconConatiner: {
        padding: 15,
        marginLeft: 10,
    },
});

export default DrawerNavContent;
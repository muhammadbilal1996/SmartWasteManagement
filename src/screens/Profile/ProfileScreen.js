import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import LinearGradient from "react-native-linear-gradient";
import {Colors} from "../../utills/Colors";

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);

    const handleNameChange = (text) => {
        setName(text);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }

    const handleImageUpload = () => {
        // Implement image upload logic here
        // This can involve using libraries like react-native-image-picker or react-native-camera
    }

    const handleUpdateProfile = () => {
        // Implement profile update logic here
        console.log("Name:", name);
        console.log("Password:", password);
        console.log("Image:", image);
    }

    return (
        <View style={styles.mainContainer}>
            <Header title={'Profile'} />
            <View style={styles.profileContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={handleNameChange}
                    value={name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={handlePasswordChange}
                    value={password}
                />
                {/*<TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>*/}
                {/*    <Text style={styles.buttonText}>Update</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity
                    onPress={handleUpdateProfile}
                    style={[
                        styles.signIn,
                        {
                            borderColor: Colors.primary_dark,
                            borderWidth: 1,
                            marginTop: 15,
                        },
                    ]}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.primary_dark]}
                        style={styles.signIn}>
                        <Text style={[styles.textSign, { color: '#fff' }]}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 12
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        height: 48,
        width: '100%',
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    updateButton: {
        backgroundColor: 'gray',
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

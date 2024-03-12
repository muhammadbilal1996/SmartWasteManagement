import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import Header from "../../components/Header";
import {Colors} from "../../utills/Colors";
import LinearGradient from "react-native-linear-gradient";
import database from "@react-native-firebase/database";
import constants from "../../constants";
import Snackbar from "react-native-snackbar";

const FeedbackScreen = () => {
    const [feedback, setFeedback] = useState('');
    const getUserDetails = async () => {
        return await constants.storage.get('userDetails');
    };
    const submitFeedback = () => {
        if (feedback.trim() === '') {
            Alert.alert('Error', 'Please provide your feedback');
            return;
        }
        getUserDetails().then(res => {
           const data = {
               email: res?.userEmail,
               feedback: feedback,
           }
            database()
                .ref(`/feedback`)
                .push(data);
            Snackbar.show({
                text: 'Feedback submitted.',
                duration: parseInt(2000),
                action: {
                    text: '',
                    textColor: Colors.primary,
                    onPress: () => {},
                },
            });
        });

        setFeedback('');
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Header title={'Feedback'} />
            <View style={{marginHorizontal: 12}}>


            <TextInput
                style={styles.input}
                placeholder={'Enter feedback'}
                placeholderTextColor={'#2c2c2c'}
                multiline
                numberOfLines={5}
                value={feedback}
                onChangeText={text => setFeedback(text)}
            />
            <TouchableOpacity
                onPress={submitFeedback}
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
                    <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        minHeight: 150,
        color: '#2c2c2c',
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

export default FeedbackScreen;

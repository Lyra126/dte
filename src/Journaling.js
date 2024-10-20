import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ImageBackground, Keyboard, TextInput, Pressable, Alert, Button} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";
import globalStyles from "./styles/globalStyles";
import Fontisto from "react-native-vector-icons/Fontisto"
import axios from 'axios';

const Journaling = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');

    const handleDone = () => {
        Keyboard.dismiss();
    };

    const handleSubmit = (entry) => {
        const fetchData = async () => {
            const userEmail = "user1@example.com"; // Mocked email for demonstration
            if (userEmail) {
                try {
                    console.log("Sending request with:", { userEmail, entry });
                    const response = await axios.post(`http://192.168.0.5:8080/users/addNewEntry`, {
                        email: userEmail,
                        entry: entry
                    });
                    console.log('Response:', response.data);
                } catch (error) {
                    console.error("Error sending entry:", error);
                }
            }
        };
        fetchData();
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>[PROMPT]</Text>

            <TextInput
                style={styles.textBox}
                placeholder="How are you feeling today?"
                placeholderTextColor="gray"
                multiline
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(text)}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8bc7e0',
        padding: 20,
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70,
    },

    textBox: {
        height: 300, 
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        marginVertical: 30,
        backgroundColor: 'lightgrey',
    },

    doneButton: {
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: -20, 
    },

    submitButton: {
        backgroundColor: 'lightgrey',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10, 
    },

    buttonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default Journaling;
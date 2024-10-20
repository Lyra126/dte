import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, ScrollView} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";
import globalStyles from "./styles/globalStyles";
import Fontisto from "react-native-vector-icons/Fontisto"
import axios from 'axios';
import generateJournal from './generateJournal';

const Journaling = () => {
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const [journalText, setJournalText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchJournalText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateJournal("feeling sad and tired");
                setJournalText(text);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchJournalText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

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

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === "return") {
            Keyboard.dismiss(); // Dismiss the keyboard when "Enter" is pressed
        }
    };
    
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <Text style={styles.header}>{journalText}</Text>

                <TextInput
                    style={styles.textBox}
                    placeholder="How are you feeling today?"
                    placeholderTextColor="gray"
                    multiline
                    value={text}
                    onChangeText={setText}
                    onKeyPress={handleKeyPress}
                />
               
                
                <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(text)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
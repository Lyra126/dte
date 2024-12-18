import React, { useState , useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput, Alert, FlatList } from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';
import generateJournal from './generateJournal';
import { useGlobal } from './context/global.js';

const Journaling = () => {
    const { globalState } = useGlobal();
    const { selectedResponses } = globalState; // Access selectedResponses
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [entries, setEntries] = useState([]); 
    const [journalText, setJournalText] = useState("");
    
    useEffect(() => {
        const fetchJournalText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateJournal(selectedResponses);
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
            const userEmail = "user1@example.com"; // mock email for demonstration
            if (userEmail) {
                try {
                    console.log("Sending request with:", { userEmail, entry });
                    const response = await axios.post(`http://[...]:8081/users/addNewEntry`, {
                        email: userEmail,
                        entry: entry
                    });
                    console.log('Response:', response.data);
                    if (text.trim() === '') {
                        Alert.alert('Journal entry cannot be blank');
                        return;
                    } else {
                        setEntries([...entries, entry]);
                        setText('');
                        Alert.alert("Journal Entry Saved");
                    }
                } catch (error) {
                    console.error("Error sending entry:", error);
                }
            }
        };
        fetchData();
    
    };

    const renderEntry = ({ item }) => (
        <View style={styles.entryBox}>
            <Text style={styles.entryText}>{item}</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{journalText}</Text>

            <TextInput
                style={styles.textBox}
                placeholder="How are you feeling today?"
                placeholderTextColor="#94b9bf"
                multiline
                value={text}
                onChangeText={setText}
            />

            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(text)}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>

            <Text style={styles.entriesHeader}>Previous Entries:</Text>
            <FlatList
                data={entries}
                renderItem={renderEntry}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.entriesList}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8efdd',
        padding: 20,
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4a637d',
        marginBottom: 5,
        marginTop: 60,

    },

    textBox: {
        height: 180,
        borderColor: '#94b9bf',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#94b9bf',
        marginVertical: 10,
        backgroundColor: '#ffffff',
    },

    doneButton: {
        backgroundColor: '#94b9bf',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: 100,
    },

    submitButton: {
        backgroundColor: '#a7c5a3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: 100,
    },

    buttonContainer: {
        flexDirection: 'row',      
        justifyContent: 'space-between', 
        marginTop: 10,              
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
      },

    entriesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4a637d',
        marginTop: 20,
        marginBottom: 10,
    },

    entriesList: {
        paddingVertical: 10,
    },

    entryBox: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#94b9bf',
        borderWidth: 2,
    },

    entryText: {
        fontSize: 16,
        color: '#94b9bf',
    },
});

export default Journaling;





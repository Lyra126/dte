import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import globalStyles from './styles/globalStyles.js'; // Assuming you have a global style
import generateExercise from "./generateExercise.js";
import generateSleep from "./generateSleep.js";
import generateTea from "./generateTea.js";
import generateJournal from "./generateJournal.js";
import generateMeditation from "./generateMeditation.js";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGlobal } from './context/global.js';

const Insights = () => {
    const { globalState } = useGlobal();
    const { selectedResponses } = globalState; // Access selectedResponses
    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),
    });

    const [showBox1Text, setShowBox1Text] = useState(false);
    const [showBox2Text, setShowBox2Text] = useState(false);
    const [showBox3Text, setShowBox3Text] = useState(false);
    const [showBox4Text, setShowBox4Text] = useState(false);
    const [exerciseText, setExerciseText] = useState("");

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchExerciseText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateExercise(selectedResponses);
                setExerciseText(text);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchExerciseText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

    const [sleepText, setSleepText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchSleepText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateSleep(selectedResponses);
                setSleepText(text);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchSleepText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

    const [teaText, setTeaText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchTeaText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateTea(selectedResponses);
                setTeaText(text);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchTeaText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

    const [journalText, setJournalText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
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

    const [meditationText, setMeditationText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchMeditationText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateMeditation(selectedResponses);
                const formattedString = text.map(item => {
                    return `${item.name}: ${item.duration} seconds`;
                  }).join(', '); // If there are multiple items, this will join them with a comma
                setMeditationText(formattedString);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchMeditationText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <ScrollView>
            <Ionicons name="arrow-back-circle-outline" size={40} color="#4f7fa9" style={styles.icon} />

            <Text style={styles.welcometext}>Insights</Text>

            <View style={styles.boxContainer}>

                <View style={styles.roundedBox}>
                    <Text style={styles.boxText}>Meditation</Text>
                    <Text style={styles.additionalText}>{meditationText}</Text>
                </View>

                <View style={styles.roundedBox}>
                    <Text style={styles.boxText}>Journaling Prompt</Text>
                    <Text style={styles.additionalText}>{journalText}</Text>
                </View>

                <View style={styles.roundedBox}>
                    <ScrollView>
                    <Text style={styles.boxText}>Exercise</Text>
                    <Text style={styles.additionalText}>{exerciseText}</Text>
                    </ScrollView>
                </View>

                <View style={styles.roundedBox}>
                    <ScrollView>
                        <Text style={styles.boxText}>Sleep</Text>
                        <Text style={styles.additionalText}>{sleepText}</Text>
                    </ScrollView>
                </View>

                <View style={styles.roundedBox}>
                    <ScrollView>
                        <Text style={styles.boxText}>Sip & Relax</Text>
                        <Text style={styles.additionalText}>{teaText}</Text>
                    </ScrollView>
                </View>

            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8efdd',
        justifyContent: 'flex-start', // Align content to the top
        paddingTop: 20, // To avoid clash with the top area
    },
    welcometext: {
        fontFamily: 'Gabarito-Bold',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: -40,
        textAlign: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: '10%',
        marginLeft: '5%',
    },
    boxContainer: {
        flexDirection: 'column', // Stack boxes vertically
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    roundedBox: {
        width: '100%', // Adjust width as needed
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        maxHeight: 350, // Ensure the box has a maximum height for scrollability
        overflow: 'hidden', // Hide overflow to make the scrollable content work properly
    },
    boxText: {
        fontSize: 22,
        color: '#5f8794',
        fontFamily: 'Gabarito-Bold',
    },
    scrollContainer: {
        maxHeight: 150, // Max height to allow scrolling
    },
    additionalText: {
        marginTop: 3,
        fontSize: 16,
        fontFamily: 'Outfit-Medium',
        color: '#666',
    },
});

export default Insights;
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import globalStyles from './styles/globalStyles.js'; // Assuming you have a global style
import generateExercise from "./generateExercise.js";

const Insights = () => {
    const [showBox1Text, setShowBox1Text] = useState(false);
    const [showBox2Text, setShowBox2Text] = useState(false);
    const [showBox3Text, setShowBox3Text] = useState(false);
    
    const [exerciseText, setExerciseText] = useState("");

    // useEffect to fetch the exercise text when the component mounts
    useEffect(() => {
        const fetchExerciseText = async () => {
            try {
                // Call the generateExercise function (assumes generateExercise is correctly imported)
                const text = await generateExercise("back ache");
                setExerciseText(text);  // Update the state with the text
            } catch (error) {
                console.error("Error generating exercise text:", error);
            }
        };

        fetchExerciseText();  // Trigger fetching when component mounts
    }, []);  // Empty dependency array means it runs only once when the component mounts

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <Text style={styles.welcometext}>Insights</Text>

            <View style={styles.boxContainer}>
                <TouchableOpacity
                    style={styles.roundedBox}
                    onPress={() => setShowBox1Text(!showBox1Text)} // Toggle Box 1's text visibility
                >
                    <Text style={styles.boxText}>Meditation</Text>
                    {showBox1Text && <Text style={styles.additionalText}>Meditation tips go here</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.roundedBox}
                    onPress={() => setShowBox2Text(!showBox2Text)} // Toggle Box 2's text visibility
                >
                    <Text style={styles.boxText}>Journaling</Text>
                    {showBox2Text && <Text style={styles.additionalText}>Journaling tips go here</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.roundedBox}
                    onPress={() => setShowBox3Text(!showBox3Text)} // Toggle Box 3's text visibility
                >
                    <Text style={styles.boxText}>Exercise</Text>
                    {showBox3Text && (
                        <ScrollView style={styles.scrollContainer}>
                            <Text style={styles.additionalText}>{exerciseText}</Text>
                        </ScrollView>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        paddingTop: 20, // To avoid clash with the top area
    },
    welcometext: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boxContainer: {
        flexDirection: 'column', // Stack boxes vertically
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    roundedBox: {
        width: '90%', // Adjust width as needed
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow
        maxHeight: 350, // Ensure the box has a maximum height for scrollability
        overflow: 'hidden', // Hide overflow to make the scrollable content work properly
    },
    boxText: {
        fontSize: 16,
        color: '#333',
    },
    scrollContainer: {
        maxHeight: 150, // Max height to allow scrolling
    },
    additionalText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
});

export default Insights;
import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "./styles/globalStyles";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import checkInQuiz from './checkInQuiz.json';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icon library

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding while fonts load

const CenterHome = ({ route }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [selectedResponses, setSelectedResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),
    });

    useEffect(() => {
        if (route.params) {
          const { email } = route.params;
          setEmail(email);
          if (email) {
            saveUserData("email", email);
            axios.get(`http://192.168.0.5:8080/users/getUser?email=${email}`)
                .then((response) => {
                
                    const userData = response.data;
                    if (userData) {                        
                        // setPoints(userData.current_points);
                        // setName(userData.name);
                        // setCompostSaved(userData.compost_made);
                        // setSavedLocations(userData.saved_locations);
                        // setPoints(userData.current_points);
                        // setFruitTree(userData.tree_type);
                    } else {
                        console.error("User not found or incorrect credentials");
                    }
                }) 
                .catch((error) => {
                    // Error handling
                    console.error("Error getting user data:", error);
                });
          }
        }
      }, [route.params]);
    

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Prevent rendering until fonts are loaded
    }

    const saveUserData = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    };

    const completeCheckIn = () => {
        setHasCheckedIn(true);
        console.log("User Responses: ", selectedResponses);
    };

    // reseting check in
    const resetCheckIn = () => {
        setHasCheckedIn(false);
        setSelectedResponses({});
        setCurrentQuestionIndex(0);
        console.log("Check-In reset.");
    };

    // options for quiz
    const handleOptionSelect = (questionId, response) => {
        setSelectedResponses(prevState => ({
            ...prevState,
            [questionId]: response
        }));
        if (currentQuestionIndex < checkInQuiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            completeCheckIn();
        }
    };

    const navigateToProfile = () => {
        navigation.navigate("Profile"); // Use navigation instead of route
    };

    // Generating simplified summary
    const generateSimplifiedSummary = () => {
        const summaryItems = Object.keys(selectedResponses).map((questionId, index) => {
            const question = checkInQuiz.questions.find(q => q.id === parseInt(questionId));
            const option = question.options.find(opt => opt.response === selectedResponses[questionId]);

            return (
                <View key={index} style={styles.simplifiedSummaryItem}>
                    <Text style={styles.simplifiedSummaryText}>{option.summary}</Text>
                </View>
            );
        });

        return (
            <View style={styles.simplifiedSummaryContainer}>
                {summaryItems}
            </View>
        );
    };

    // rendering check in content
    const renderCheckInContent = () => {
        if (hasCheckedIn) {
            return (
                <View style={styles.checkInOutputs}>
                    <View style={styles.insightHeader}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', fontFamily: 'Gabarito-Bold'}}>Today's Insights</Text>
                        <TouchableOpacity onPress={resetCheckIn} style={styles.resetButton}>
                            <Ionicons name="refresh-circle-outline" size={28} color="#989898" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>
                        You have checked in for the day, great job!
                    </Text>
                    {generateSimplifiedSummary()}
                    <TouchableOpacity style = {styles.finishCheckInButton}>
                        <Text style={styles.finishCheckInText}>View Today's Check-In</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            const currentQuestion = checkInQuiz.questions[currentQuestionIndex];
            return (
                <View style={styles.checkInQuiz}>
                    <View key={currentQuestion.id} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                        <View style={styles.optionsContainer}>
                            {currentQuestion.options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleOptionSelect(currentQuestion.id, option.response)}
                                >
                                    <Text style={styles.optionText}>{option.emoji} {option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            );
        }
    };



    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerView}>
                    <View style={styles.textContainer}>
                        <Text style={{fontFamily: 'Gabarito-Regular', fontSize: 18}}>Welcome Back</Text>
                        <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Gabarito-Bold' }}>Testing User</Text>
                    </View>
                    <TouchableOpacity onPress={navigateToProfile}>
                        <Image
                            source={require('./assets/earthDay.gif')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.todayView}>
                    <View style={[styles.todayViewText]}>
                        <Text style={{ fontFamily: 'Gabarito-Bold', color: '#FFFFFF', fontSize: 23, fontWeight: 'bold' }}>October 19th, 2024</Text>
                        <Text style={{ fontFamily: 'Gabarito-Regular',color: '#FFFFFF', fontSize: 18 }}>28 days postpartum</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: '3%' }}>You are strong, capable, and doing an amazing job. Be gentle with yourself—you're exactly what your baby needs.</Text>
                    </View>
                </View>

                <Text style={{fontFamily: 'Outfit-Medium',marginLeft: 15, marginBottom: -12, fontSize: 20, color: '#475646'}}> Daily Check-In</Text>
                <View style={styles.checkInView}>
                    <View style={styles.checkInViewText}>
                        {renderCheckInContent()}
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
        fontFamily: 'Outfit-Regular',
    },
    scrollContainer: {
        paddingVertical: 20,
        gap: 20,
    },
    headerView: {
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    checkInView: {
        height: '58%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        justifyContent: 'flex-start',
        flexDirection: 'column',

        marginRight: 15,
        marginLeft: 15,
    },
    checkInViewText: {
        width: '100%',
        padding: 15,
    },
    todayView: {
        backgroundColor: '#94b9be',
        fontFamily: 'Gabarito-Regular',
        borderRadius: 20,
        flexDirection: 'column',
        height: '150px',

        marginRight: 15,
        marginLeft: 15,
        paddingHorizontal: 10,
    },
    todayViewText: {
        width: '100%',
        color: "#FFFFFF",
        padding: 15,
    },
    checkInOutputs: {
        paddingHorizontal: 10,
    },
    insightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    questionContainer: {
        marginBottom: 20,
        marginTop: -10,
        padding: 15,
        borderRadius: 25,
    },
    questionText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Outfit-Medium',
    },
    optionsContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        gap: 5
    },
    optionButton: {
        padding: 10,
        borderRadius: 20,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'rgba(122,119,119,0.35)',
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Gabarito-Regular',
        textAlign: 'center',
    },
    simplifiedSummaryContainer: {
        marginTop: 10,
        borderRadius: 10,
        columnGap: 4,
        elevation: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    simplifiedSummaryItem: {
        backgroundColor: '#e8e8e8',
        padding: 7,
        borderRadius: 15,
        marginVertical: 4,
        shadowColor: "#000",
        elevation: 1,
    },
    simplifiedSummaryText: {
        fontSize: 13.5,
        color: '#444',
        fontFamily: 'Outfit-Regular',
        textAlign: 'center',
    },
    finishCheckInButton: {
        backgroundColor: '#a7c4a3',
        padding: 10,
        width: '100%',
        borderRadius: 20,
        marginTop: 15,
    },
    finishCheckInText: {
        color: '#384d35',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Gabarito-Regular',
    }
});

export default CenterHome;

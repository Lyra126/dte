import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "./styles/globalStyles";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import checkInQuiz from './checkInQuiz.json';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding while fonts load

const CenterHome = ({ route }) => {
    const [email, setEmail] = useState('');
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [selectedResponses, setSelectedResponses] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState('');

    // fonts
    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),

    });
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
        }
    }, [fontsLoaded]);

    const saveUserData = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    };

    // login information
    useEffect(() => {
        if (route.params) {
            const { email } = route.params;
            setEmail(email);
            if (email) {
                saveUserData("email", email);
                axios.get(`http://192.168.1.159:8080/users/getUser?email=${email}`)
                    .then((response) => {
                        const userData = response.data;
                        if (userData) {
                            setHasCheckedIn(userData.hasCheckedInToday);
                        } else {
                            console.error("User not found or incorrect credentials");
                        }
                    })
                    .catch((error) => {
                        console.error("Error getting user data:", error);
                    });
            }
        }
    }, [route.params]);

    const completeCheckIn = () => {
        setHasCheckedIn(true);
        console.log("User Responses: ", selectedResponses);
    };

    // getting date (API)

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

    // rendering check in content
    const renderCheckInContent = () => {
        if (hasCheckedIn) {
            return (
                <View style={styles.checkInOutputs}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black', fontFamily: 'Gabarito-Bold'}}>Today's Insights</Text>
                    <Text style={{ fontSize: 14, color: 'grey', marginTop: 10 }}>
                        You have checked in for the day! Keep up the great work!
                    </Text>
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

    if (!fontsLoaded) {
        return null; // Prevent rendering until fonts are loaded
    }

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerView}>
                    <View style={styles.textContainer}>
                        <Text style={{fontFamily: 'Gabarito-Regular', fontSize: 18}}>Welcome Back</Text>
                        <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Gabarito-Bold' }}>Testing User</Text>
                    </View>
                    <Image
                        source={require('./assets/earthDay.gif')}
                        style={styles.profileImage}
                    />
                </View>
                <View style={styles.todayView}>
                    <View style={[styles.todayViewText]}>
                        <Text style={{ fontFamily: 'Gabarito-Bold', color: '#FFFFFF', fontSize: 23, fontWeight: 'bold' }}>October 19th, 2024</Text>
                        <Text style={{ fontFamily: 'Gabarito-Regular',color: '#FFFFFF', fontSize: 18 }}>28 days postpartum</Text>
                        <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: '4%' }}>You are strong, capable, and doing an amazing job. Be gentle with yourself—you're exactly what your baby needs.</Text>
                    </View>
                </View>

                <Text style={{fontFamily: 'Outfit-Regular',marginLeft: 15, marginBottom: -12, fontSize: 20, color: '#475646'}}> Daily Check-In</Text>
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
        shadowColor: "#837356",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
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
        shadowColor: "#2c8591",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
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
    quizButton: {
        backgroundColor: '#2c8591',
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
        alignSelf: 'center',
    },
});

export default CenterHome;

import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useEffect } from "react";
import globalStyles from './styles/globalStyles.js';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const PromptLoginSignUp = () => {
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
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <Image source={require('./assets/babyAndMother.png')} style={styles.image}></Image>
            <Text style={styles.welcometext}>Welcome to CARE</Text>
            <Text style={styles.text}>Postpartum support with health tracking, self-care tips, and mental wellness.</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={() => {navigation.navigate('SignUp')}}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8efdd',
        padding: 40,
    },
    image: {
        width: '100%', // Use percentage to make the image responsive
        height: '30%', // Adjust as needed
        marginTop: '30%',
    },
    welcometext: {
        fontFamily: 'Gabarito-Bold',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20
    },
    text:{
        fontFamily: 'Outfit-Regular',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        color: 'grey',
        textAlign: 'center',
        marginVertical: 5,
    },
    loginButton: {
        backgroundColor: '#78bbd9',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 40,
    },
    signUpButton: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 15,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: 40,
    },

    loginText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Outfit-Medium',
        fontSize: 18,
    },
    signUpText:{
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Outfit-Medium',
        fontSize: 18,
    }
});

export default PromptLoginSignUp;
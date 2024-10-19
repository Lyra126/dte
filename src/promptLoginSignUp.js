import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import globalStyles from './styles/globalStyles.js';
import { useNavigation } from '@react-navigation/native';


const PromptLoginSignUp = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <Image source={require('./assets/babyAndMother.png')} style={styles.image}>
            </Image>
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
        backgroundColor: '#ffffff',
        padding: 40,
    },
    image: {
        width: '100%', // Use percentage to make the image responsive
        height: '30%', // Adjust as needed
        marginTop: '30%',
    },
    welcometext: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 40,
        marginRight: 40
    },
    text:{
        fontSize: 16,
        marginLeft: 40,
        marginRight: 40,
        color: 'grey',
        textAlign: 'center',
        marginVertical: 20,
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
    },
    signUpText:{
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default PromptLoginSignUp;
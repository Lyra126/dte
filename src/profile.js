import React, { useState, useEffect } from "react";
import { Image, Modal, TextInput, Button } from "react-native";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import globalStyles from './styles/globalStyles.js';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
SplashScreen.preventAutoHideAsync();

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false); // New state for logout confirmation modal
    const [username, setUserName] = useState("");
    const [day_of_giving_birth, setDayOfGivingBirth] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [location, setLocation] = useState("");
    const [emergContacts, setEmergContacts] = useState([]);
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('./fonts/Outfit/Outfit-Regular.ttf'),
        'Outfit-Bold': require('./fonts/Outfit/Outfit-Bold.ttf'),
        'Outfit-Black': require('./fonts/Outfit/Outfit-Black.ttf'),
        'Outfit-Medium': require('./fonts/Outfit/Outfit-Medium.ttf'),
        'Gabarito-Regular': require('./fonts/Gabarito/Gabarito-Regular.ttf'),
        'Gabarito-Bold': require('./fonts/Gabarito/Gabarito-Bold.ttf'),
    });

    

    const getUserData = async (key) => {
        const result = await SecureStore.getItemAsync(key);
        if (result) {
            setEmailAddress(result);
            return result;
        } else {
            console.log('No value stored under that key.');
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userEmail = await getUserData("email");
            if (userEmail) {
                console.log(userEmail);
                const response = await axios.get(`http://192.168.0.38:8082/users/getUser?email=${userEmail}`);
                const userData = response.data;
                if (userData) {
                    setUserName(userData.user_name);
                    setEmailAddress(userData.email_address);
                    setLocation(userData.location);
                    setEmergContacts(userData.emergency_contacts);
                } else {
                    console.error("User not found or incorrect credentials");
                }
            }
          } catch (error) {
            console.error("Error getting user data:", error);
          } finally {
            setLoading(false); // Set loading to false regardless of success or failure
          }
        };
      
        fetchData();
      }, []);

    const navigateToProfile = () => {
        navigation.navigate("centerHome"); // Use navigation instead of route
    };

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const handleEditProfile = () => {
        setModalVisible(true);
    };

    const handleSaveProfile = () => {
        // Handle saving the updated profile information
        console.log("Name:", username);
        console.log("Email:", emailAddress);
        console.log("Location:", location);
        console.log("Emergency Contact 1: ", emergContacts[0]);
        console.log("Emergency Contact 2: ", emergContacts[1]);
        setModalVisible(false);
    };

    const handleLogout = () => {
        // Show logout confirmation modal
        setLogoutModalVisible(true);
    };

    const confirmLogout = () => {
        // Handle actual logout here
        console.log("User logged out.");
        setLogoutModalVisible(false);
        // Navigate to login screen or handle logout logic
    };

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%' }}>
                <TouchableOpacity onPress={handleEditProfile}>
                    <Text style={{ color: 'grey', marginTop: '15%', marginLeft: '5%', fontSize: 15, fontFamily: 'Gabarito-Regular' }}>
                        <MaterialCommunityIcons name='lead-pencil' size={18} /> Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <Image source={require('./assets/babyAndMother.png')} style={styles.image}></Image>
            <View style={styles.userInformation}>
                <Text style={styles.userInfoName}>{username}</Text>

                {/* email */}
                <Text style={{ fontFamily: 'Gabarito-Bold', fontSize: 20, marginTop: '5%', color: '#364624' }}>Email</Text>
                <Text style={styles.userInfoText}>{emailAddress}</Text>

                {/* locations */}
                <Text style={{ fontFamily: 'Gabarito-Bold', fontSize: 20, marginTop: '5%', color: '#364624' }}>Location</Text>
                <Text style={styles.userInfoText}>{location}</Text>

                {/* emergency contacts */}
                <Text style={{ fontFamily: 'Gabarito-Bold', fontSize: 20, marginTop: '5%', color: '#364624' }}>Emergency Contact Information</Text>
                <Text style={styles.userInfoText}>Contact One</Text>
                {/*<Text style={styles.userInfoText}>{emergContacts[0]}</Text>*/}
                <Text style={[styles.userInfoText, { marginTop: 10 }]}>Contact 2</Text>

                {/* log out button */}
                {/*<Text style={styles.userInfoText}>{emergContacts[1]}</Text>*/}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}> Logout </Text>
                </TouchableOpacity>
            </View>

            {/* Edit Profile Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>

                        <Text style = {styles.modalText}> New Name </Text>
                        <TextInput
                            placeholder="Enter your name"
                            style={styles.input}
                            value={username}
                            onChangeText={(text) => setName(text)}
                        />

                        <Text style = {styles.modalText}> New Email </Text>
                        <TextInput
                            placeholder="Enter your email"
                            style={styles.input}
                            value={emailAddress}
                            onChangeText={(text) => setEmail(text)}
                        />

                        <Text style = {styles.modalText}> Change Location </Text>
                        <TextInput
                            placeholder="Enter your location"
                            style={styles.input}
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                        />

                        <Text style = {styles.modalText}> Change 1st Emergency Contact </Text>
                        <TextInput
                            placeholder="Enter 1st emergency contact"
                            style={styles.input}
                            value={emergContacts[0]}
                            onChangeText={(text) => setEmerContact1(text)}
                        />

                        <Text style = {styles.modalText}> Change 2nd Emergency Contact </Text>
                        <TextInput
                            placeholder="Enter 2nd emergency contact"
                            style={styles.input}
                            value={emergContacts[1]}
                            onChangeText={(text) => setEmerContact2(text)}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        {/*  Log out Modal  */}
            {/* Logout Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={logoutModalVisible}
                onRequestClose={() => setLogoutModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Logout</Text>
                        <Text style={{ fontFamily: 'Gabarito-Regular', marginBottom: 15, textAlign:'center'}}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={confirmLogout}>
                                <Text style={styles.saveButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setLogoutModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8efdd',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: '10%',
        marginLeft: '5%',
    },
    image: {
        width: 200,
        borderColor: '#e8efdd',
        borderWidth: 5,
        backgroundColor: 'grey',
        height: 200,
        marginTop: 25,
        borderRadius: 130,
        justifyContent: 'center',
        marginHorizontal: 'auto',
        zIndex: 1,
    },
    userInformation: {
        marginTop: '-25%',
        height: '85%',
        backgroundColor: '#97bb9e',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    userInfoName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        fontFamily: 'Gabarito-Bold',
        color: '#1f3e4f',
    },
    userInfoText: {
        fontSize: 18,
        fontFamily: 'Gabarito-Regular',
        color: '#4b6540',
    },
    logoutButton: {
        backgroundColor: '#4f7fa9',
        padding: 15,
        borderRadius: 15,
        width: '65%',
        marginTop: 40,
        marginHorizontal: 40,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Gabarito-Regular',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,

    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Gabarito-Bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Gabarito-Regular',
        marginBottom: 5,

    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#4f7fa9',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontFamily: 'Gabarito-Regular',
    },
    cancelButton: {
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontFamily: 'Gabarito-Regular',
    },
});

export default Profile;

import React, { useRef, useEffect, useState } from "react";
import { ScrollView, View, Animated, Image, Linking,StyleSheet, SafeAreaView, Text, TouchableOpacity,Platform, Modal} from "react-native";
import { useNavigation } from '@react-navigation/native';
import globalStyles from "./styles/globalStyles";
import axios from "axios"; 
import * as SecureStore from 'expo-secure-store';

const CenterHome = ({route}) => {
    const [email, setEmail] = useState('');
    const [showSavedLocationsPopup, setShowSavedLocationsPopup] = useState(false);
    const navigation = useNavigation();
    const [points, setPoints] = useState(0);
    const [name, setName] = useState("");
    const [treesGrown, setTreesGrown] = useState(0); 
    const [compostSaved, setCompostSaved] = useState(0);
    const [savedLocations, setSavedLocations] = useState([]);


    const saveUserData = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }

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
                        setPoints(userData.current_points);
                        setName(userData.name);
                        setCompostSaved(userData.compost_made);
                        setSavedLocations(userData.saved_locations);
                        setPoints(userData.current_points);
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
    


    const toggleSavedLocationsPopup = () => {
        setShowSavedLocationsPopup(!showSavedLocationsPopup);
    };

    const navigateToAppleMaps = (currentAddress) => {
        const scheme = Platform.select({
            ios: 'maps://',
        });
    
        const url = Platform.select({
            ios: `${scheme}?q=${encodeURIComponent(currentAddress)}`,
        });
    
        Linking.openURL(url);
    };


    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.headerView}>
                    <View>
                        <Text>Welcome Back</Text>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{name}</Text>
                    </View>
                    <Image
                        style={styles.profileImage}
                    />
                </View>

            <View style={styles.profilePreviewView}>
                <View style={styles.profilePreviewText}>
                    <Text style={styles.profile}>Total Points: {points}</Text>
                    <Text style={styles.profile}>Compost Saved: {compostSaved}</Text>
                    <TouchableOpacity style={styles.homeButton} onPress={toggleSavedLocationsPopup}>
                        <Text style={styles.savedlocationsbutton}>Saved Locations</Text>
                    </TouchableOpacity>
                    <Modal animationType="slide" transparent={true} visible={showSavedLocationsPopup} onRequestClose={toggleSavedLocationsPopup}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                {savedLocations.map((location, index) => (
                                    <View key={index}>
                                        <Text style = {styles.locationText}>{index+1}: {location}</Text>
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigateToAppleMaps(location)}>
                                            <Text style={styles.buttonLabel}>►</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <TouchableOpacity onPress={toggleSavedLocationsPopup}>
                                    <Text style={styles.closeButton}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>


            <View style = {styles.treePreviewView}>
                <Image
                    style={styles.treeImage}
                    source={getImage()}
                    />
                <View style={styles.treePreviewText}>
                
                    <Text style = {{color: '#e7e7e7'}}>13 weeks old</Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        marginLeft:15,
        marginRight:15
    },
    scrollContainer: {
        paddingVertical: 20, // Add padding vertically
        gap: 20,
    },
    headerView: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileImage: {
        marginTop: -10,
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    treePreviewView: {
        height: 660,  // Adjust height if necessary
        padding: '4.5%',
        backgroundColor: '#8bc7e0',
        borderRadius: 20,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    treePreviewText:{
        marginTop: 20,
        marginBottom: 15
    }, 
    treeImage: {
        width: '100%',
        height: '80%',
        borderRadius: 12,
    },
    treePreviewProgression:{
        backgroundColor: 'blue',
        height: '100%',
        width: '23%',
    },
    profilePreviewView:{
        backgroundColor: '#5f7046',
        borderRadius: 30,
        flexDirection: 'column',
        height: 110,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePreviewText: {
        width: '70%',
        color: "#FFFFFF",
        padding: 15,
    }, 
    profile: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 2
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
        width: '70%',
    
    },
    homeButton: {
        backgroundColor: "#EE856F",
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        marginTop: 10,
        color: "blue",
    },
    savedlocationsbutton:{
        color: "white",
        fontWeight: 'bold',
        justifyContent: "center",
        textAlign: "center"
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        backgroundColor: "#26f",
        borderRadius: 8,
        width:40
    },
    buttonLabel: {
        fontSize: 18,
        color: "white",
    },
    locationText: {
        fontSize:20
    }
});

export default CenterHome;
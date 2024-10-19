import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import globalStyles from './styles/globalStyles.js'; // Assuming you have a global style

const Profile = () => {

    return (
        <SafeAreaView style={[globalStyles.AndroidSafeArea, styles.container]}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8efdd',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content to the top
        paddingTop: 20, // To avoid clash with the top area
    },


});

export default Profile;
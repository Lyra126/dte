import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { GlobalProvider } from "./src/context/global";
import Welcome from "./src/Welcome.js";
import PromptLoginSignUp from "./src/promptLoginSignUp.js";
import Login from "./src/Login.js";
import SignUp from "./src/signUp.js";
import CenterHome from "./src/centerHome.js";
import Navigation from "./Navigation";

const Stack = createStackNavigator();

// authentification screens
const AuthStack = ({ handleLogin }) => (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="PromptLoginSignUp" component={PromptLoginSignUp} />
        <Stack.Screen name="Login">
            {props => <Login {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
            {props => <SignUp {...props} onLogin={handleLogin} />}
        </Stack.Screen>
    </Stack.Navigator>
);

// after user logs in screens
// after user logs in screens
const AppStack = ({email}) => {
    const navigation = useNavigation();
    useEffect(() => {
        if (email) {
            navigation.setParams({ email });
        }
    }, [email]);

    return (
        <Stack.Navigator initialRouteName="Navigation" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Navigation" component={Navigation} />
            <Stack.Screen name="CenterHome" component={CenterHome} initialParams={{ email: email }} />
        </Stack.Navigator>
    );
};



// In your App.js file
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = (userEmail) => {
        setIsLoggedIn(true);
        setEmail(userEmail);
    };

    return (
        <GlobalProvider>
            <NavigationContainer>
                {isLoggedIn ? ( <AppStack email={email} /> ) : (<AuthStack handleLogin={(userEmail) => {  handleLogin(userEmail); }} />)}
            </NavigationContainer>
        </GlobalProvider>
    );
};

export default App;


// import React from 'react';
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet, Text, View, Button } from 'react-native';
// import Meditate from './src/Meditate.js'; // Import the Meditate screen
// import Journaling from './src/Journaling.js'; // Import the Journaling screen
// import centerHome from './src/centerHome.js'; // Import the Journaling screen

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Journaling" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Journaling" component={Journaling} />
//         {/* <Stack.Navigator initialRouteName="Meditate" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Meditate" component={Meditate} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };


// export default App;



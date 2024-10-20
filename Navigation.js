import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from "react";

import CenterHome from "./src/centerHome";
import Journaling from "./src/Journaling.js";
import Meditate from "./src/Meditate.js";
import Profile from "./src/profile.js";


const Tab = createBottomTabNavigator();

function TabGroup(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={CenterHome}/>
            <Tab.Screen name="Journaling" component={Journaling}/>
            <Tab.Screen name="Meditation" component={Meditate}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <TabGroup />
    )
}
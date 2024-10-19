import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CenterHome from "./src/centerHome";
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from "react";


const Tab = createBottomTabNavigator();
//<Tab.Screen name="Home" component={CenterHome}/>
function TabGroup(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
        

        </Tab.Navigator>
    )
}
export default function Navigation(){
    return(
        <TabGroup />
    )
}
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreens from './src/Screens/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import WelcomeScreen from './src/Screens/WelcomeScreen';
import SitesAndEventsScreen from './src/Screens/SitesAndEventsScreen';
import ChooseZoneApt from './src/Pages/Home/ChooseZone';
import SiteViewCardScreen from './src/Screens/SiteViewCardScreen';
import EventViewCardScreen from './src/Screens/EventViewCardScreen';

const Stack = createNativeStackNavigator();

const Index = () => {
    return (
        <>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Group screenOptions={{ headerShown: false }} >
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </Stack.Group>
                    <Stack.Group >
                        <Stack.Screen name="chooseZone" component={ChooseZoneApt} options={{ title: 'Elije una Zona' }} />
                        <Stack.Screen name="Home" component={HomeScreens} options={{ title: 'Inicio'}} />
                        <Stack.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ title: 'Perfil'}}
                        />
                        <Stack.Screen name="listSites" component={SitesAndEventsScreen} options={{ title: 'Sitios y Eventos' }} />
                        <Stack.Screen name="siteCard" component={SiteViewCardScreen} options={{ title: 'Sitio' }} />
                        <Stack.Screen name="eventCard" component={EventViewCardScreen} options={{ title: 'Evento' }} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Index;
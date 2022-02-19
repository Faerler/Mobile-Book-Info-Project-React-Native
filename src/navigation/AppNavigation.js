import React from "react";
import { StyleSheet, View, Image, Text } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BookScreen from "../screens/BookScreen";
import AddBook from "../screens/AddBook";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import LoadingPage from "../LoadingPage";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import CategoryBook from "../screens/CategoryBook";

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Loading" >
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen options={{ headerShown: false }} name='Home' component={TabNavigator} />
            <Stack.Screen name='Book' component={BookScreen} />
            <Stack.Screen name="AddBook" component={AddBook} />
            <Stack.Screen name="Category" component={CategoryBook} />
            <Stack.Screen name="Search" component={DrawerNavigator} />
            <Stack.Screen options={{ headerShown: false }} name="Loading" component={LoadingPage} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#C0C0C0',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'rgb(255,140,49)',
                    position: 'absolute',
                    bottom: 5,
                    left: 15,
                    right: 15,
                    elevation: 0,
                    borderRadius: 15,
                    height: 65,

                }
            }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image source={require('../../assets/icons/homeNew.png')} style={{
                            marginLeft: 18,
                            height: 25,
                            width: 25,
                            tintColor: focused ? 'white' : '#C0C0C0',
                        }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: focused ? 'white' : '#C0C0C0',
                        }}>Ana Sayfa</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name='Search' component={SearchScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image source={require('../../assets/icons/searchIcon.png')} style={{
                            marginLeft: 9,
                            height: 25,
                            width: 25,
                            tintColor: focused ? 'white' : '#C0C0C0',
                        }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: focused ? 'white' : '#C0C0C0',
                        }}>Araştır</Text>
                    </View>
                ),
            }} />
            <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image source={require('../../assets/icons/profileIcon.png')} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 3,
                            height: 30,
                            width: 30,
                            tintColor: focused ? 'white' : '#C0C0C0',
                        }} />
                        <Text style={{
                            fontWeight: 'bold',
                            color: focused ? 'white' : '#C0C0C0',
                        }}>Profil</Text>
                    </View>
                ),
            }} />
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerPosition='left'
            initialRouteName='Main'
            drawerStyle={{
                width: 250
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
        >
            <Drawer.Screen name='Main' component={MainNavigator} />
        </Drawer.Navigator>
    )

}

export default function AppContainer() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    )
}

//console.disableYellowBox = true;


import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <AppContainer />
  );
}


import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native'
import { auth } from '../firebase';

export default function LoadingPage() {

    const navigation = useNavigation();


    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate("Home");
            }
            else {
                navigation.navigate("Login");
            }
        })

    }, [])


    return (
        <View style={styles.container}>
            <Image style={styles.myIcon} source={require("../assets/advice_icon.png")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myIcon: {
        height: 180,
        resizeMode: "contain",
    }
});
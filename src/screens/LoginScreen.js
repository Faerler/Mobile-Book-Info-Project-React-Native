import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../../firebase'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { auth } from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function LoginScreen() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const handleSignIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userAlready) => {
                const user = userAlready.user;
                registerForPushNotificationsAsync();
                navigation.replace('Home')
            })
            .catch((error) => {
                alert('Hesabınız bulunamadı! \n\nBilgilerinizi tekrar girerek giriş yapmayı deneyiniz.')
                console.log(error);
            })
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            await setDoc(doc(db, "UserToken", email), {
                token: token,
            });
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behaviour='padding'
        >
            <View >
                <Image style={styles.myIcon} source={require("../../assets/advice_icon.png")} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Şifre"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    myIcon: {
        height: 180,
        resizeMode: "contain",
        justifyContent: 'center',
        marginBottom: 20
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 11,
        borderRadius: 10,
        marginTop: 8,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',

        marginTop: 40,
    },
    button: {
        backgroundColor: 'rgb(255,140,49)',
        width: '100%',
        padding: 13,
        alignItems: 'center',
        borderRadius: 10,

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 7,
        borderColor: 'rgb(255,140,49)',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: 'rgb(255,140,49)',
        fontWeight: '700',
        fontSize: 15
    }
})




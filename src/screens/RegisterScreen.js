import React, { useState, useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../../firebase'
import BackButton from '../components/BackButton/BackButton'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/core'

export default function RegisterScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((registerUser) => {
                const user = registerUser.user;
                alert('Kayıt işlemi başarıyla gerçekleştirildi');
                navigation.navigate("Login")
            })
            .catch((error) => {
                alert('Kayıt olma işleminiz sırasında bir hata gerçekleşti.\n\nBilgilerinizin şu koşulları karşıladığından emin olunuz:\n\nMail adresi geçerli olmalıdır!\n\nŞifreniz en az 6 hane içermelidir!')
                console.log(error);
            })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: " ",
            headerTransparent: "true",
            headerLeft: () => (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            ),
            headerRight: () => <View />,
        });
    }, []);


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
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
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

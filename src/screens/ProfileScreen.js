import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import BackButton from '../components/BackButton/BackButton';
import { auth } from '../../firebase'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert("Çıkış işlemi başarısız oldu"))
    }

    useLayoutEffect(() => {
        navigation.setOptions({

            title: 'Profil',
            headerLeft: () => (
                <View />
            ),
            headerRight: () => <View />,
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainInfo}>
                <View style={styles.mail}>
                    <Image source={{ uri: 'https://www.ims.forth.gr/uploads/cv/blank.png' }} style={styles.profilePicture} />
                </View>
            </View>
            <View style={styles.subInfo}>
                <View>
                    <Text style={styles.mainTitle}>Email: </Text>
                    <Text style={styles.textStyle}>{auth.currentUser?.email}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainInfo: {
        backgroundColor: 'rgb(255,140,49)',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePicture: {
        height: 125,
        width: 125,
        borderRadius: 75,
    },
    mail: {

    },
    subInfo: {
        margin: 20
    },
    button: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: Dimensions.get('window').width / 1.60,
        borderRadius: 25,
        marginTop: Dimensions.get('window').height / 2.5,
        marginLeft: Dimensions.get('window').width / 7,

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    mainTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 10,
        borderBottomColor: '#DBD9D7',
        borderBottomWidth: 1,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        marginTop: 10,
    },
});

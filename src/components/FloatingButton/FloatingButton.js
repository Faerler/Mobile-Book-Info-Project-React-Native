import React from 'react'
import { Dimensions } from 'react-native';
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FloatingButton() {

    const navigation = useNavigation();

    const addBook = () => {
        navigation.navigate("AddBook");
    }
    return (
        <TouchableOpacity onPress={addBook} style={styles.FloatingActionButton}>
            <View style={styles.viewStyle}>
                <Image source={{ uri: 'https://icon-library.com/images/white-plus-icon/white-plus-icon-3.jpg' }} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Kitap Ekle</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    FloatingActionButton: {
        backgroundColor: 'rgb(255,140,49)',
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 10,
        height: 40,
        borderRadius: 20,
        width: Dimensions.get('window').width / 3,
    },
    viewStyle: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageStyle: {
        width: 30,
        height: 30,
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'white'
    }
});
import React from 'react'
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DrawerContainer() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <TouchableOpacity style={styles.line} onPress={() => { navigation.navigate("Category", { id: 1, pageName: 'Fantastik' }) }}>
                    <Image source={{ uri: 'https://www.pikpng.com/pngl/b/248-2483206_icon-free-download-dragon-icon-png-clipart.png' }} style={styles.myIcon} />
                    <Text style={styles.text}>Fantastik</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.line} onPress={() => { navigation.navigate("Category", { id: 2, pageName: 'Bilim Kurgu' }) }}>
                    <Image source={{ uri: 'https://i.pinimg.com/originals/3e/26/d6/3e26d6754031f68dd0c9037434d4e8cd.png' }} style={styles.myIcon} />
                    <Text style={styles.text}>Bilim Kurgu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.line} onPress={() => { navigation.navigate("Category", { id: 3, pageName: 'Polisiye' }) }}>
                    <Image source={{ uri: 'https://image.flaticon.com/icons/png/512/68/68213.png' }} style={styles.myIcon} />
                    <Text style={styles.text}>Polisiye</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.line} onPress={() => { navigation.navigate("Category", { id: 4, pageName: 'Korku' }) }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3507/3507964.png' }} style={styles.myIcon} />
                    <Text style={styles.text}>Korku</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.line} onPress={() => { navigation.navigate("Category", { id: 5, pageName: 'Eğitim' }) }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/49/49944.png' }} style={styles.myIcon} />
                    <Text style={styles.text}>Eğitim</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {

        marginTop: Dimensions.get('window').height / 2.8,
        alignItems: 'center'
    },
    line: {

        flexDirection: 'row',
        marginBottom: 7
    },
    text: {
        fontSize: 20,
    },
    myIcon: {
        height: 25,
        width: 25,
        marginRight: 10,
    }

});
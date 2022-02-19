import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from "prop-types";
import { StyleSheet } from 'react-native';


export default function CategoryButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
            <Image source={require("../../../assets/icons/menu.png")} />
        </TouchableOpacity>
    )
}

CategoryButton.protoTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
}

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 180,
        padding: 5,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: '#000',


    },
    btnIcon: {
        height: 17,
        width: 17
    }
});

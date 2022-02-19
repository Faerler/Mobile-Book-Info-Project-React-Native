import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import PropTypes from "prop-types";
import { StyleSheet } from 'react-native';

export default function BackButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.btnContainer}>
            <Image source={require("../../../assets/icons/backArrowNew.png")} style={styles.btnIcon} />
        </TouchableOpacity>
    )
}

BackButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 180,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    btnIcon: {
        height: 17,
        width: 17
    }
});
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { db } from '../../firebase'
import { Dimensions } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useNavigation } from '@react-navigation/core';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton/BackButton';

export default function CategoryBook(props) {
    const { navigation, route } = props;
    const item = route.params?.id;
    const categoryName = route.params?.pageName;
    const [books = [], setBooks] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({

            title: categoryName,
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



    const GetData = async () => {
        const booksCol = collection(db, 'BookProject');
        const bookSnapshot = await getDocs(booksCol);
        const bookList = bookSnapshot.docs.map(doc => doc.data());

        const Deneme = []
        bookList.map(data => {
            if (data.book_categoryId == item) {
                Deneme.push(data);
            }
        })
        setBooks(Deneme);

    }

    useEffect(() => {
        GetData();
    }, [])

    const onPressBook = (item) => {
        navigation.navigate("Book", { item });
    }

    const renderBooks = ({ item }) => (
        <TouchableOpacity onPress={() => onPressBook(item)}>
            <View style={styles.container}>
                <Image source={{ uri: item.bookImageUrl }} style={styles.bookImage} />
                <Text style={styles.bookNameStyle}>{item.bookName}</Text>
                <Text style={styles.bookWriterStyle}>{item.bookWriter}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.bigContainer}>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={books} renderItem={renderBooks} keyExtractor={(item) => `${item.bookId}`} />
        </View>
    )
}

const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 10,
        marginTop: 20,
        width: Dimensions.get('window').width / 2.18,
        height: 300,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15
    },
    bookImage: {
        margin: 10,
        resizeMode: "contain",
        width: 160,
        height: 210,
        borderRadius: 20,
    },
    bookNameStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookWriterStyle: {
        textAlign: 'center',
        margin: 10,
        fontSize: 10,
    }
})

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import BackButton from '../components/BackButton/BackButton';
import { db } from '../../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function SearchScreen() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [books = [], setBooks] = useState([])
    const [filteredBooks = [], setFilteredBooks] = useState([])

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            title: "Kitap Ara",
            headerLeft: () => (
                <View />
            ),
            headerRight: () => <View />,
        });
    }, []);

    useEffect(() => { }, [value]);

    const GetData = async () => {
        const booksCol = collection(db, 'BookProject');
        const bookSnapshot = await getDocs(booksCol);
        const bookList = bookSnapshot.docs.map(doc => doc.data());

        setBooks(bookList);
    }

    const handleSearch = (text) => {
        GetData();
        setValue(text);
        const nameUpper = text.toUpperCase();
        const filteredBook = [];

        books.map(data => {
            if (data.bookName.toUpperCase().includes(nameUpper)) {
                filteredBook.push(data);
            }
        });


        if (text == "") {
            setData([]);
        }
        else {
            setData(filteredBook);
        }
    }

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
            <View style={styles.searchBar}>
                <TextInput placeholder='Kitap Adı' style={styles.input} value={value} onChangeText={handleSearch} />
            </View>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderBooks} keyExtractor={(item) => `${item.bookId}`} />

        </View>
    )
}


const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        marginBottom: 68,
        justifyContent: 'center',
        alignItems: 'center',
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
    searchBar: {
        width: '90%',
        justifyContent: 'center',
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
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 11,
        borderRadius: 10,
        marginTop: 8,
    }
})

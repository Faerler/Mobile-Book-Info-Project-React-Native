import React, { useState, useEffect, useLayoutEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Modal } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { auth } from '../../firebase'
import { db } from '../../firebase'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/core'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import BackButton from '../components/BackButton/BackButton';
import { ModalPicker } from '../components/ModalPicker/ModalPicker'

export default function AddBook() {
    const [BookId, setBookId] = useState('')
    const [BookName, setBookName] = useState('')
    const [BookDescription, setBookDescription] = useState('')
    const [BookPage, setBookPage] = useState('')
    const [BookImageUrl, setBookImageUrl] = useState('')
    const [BookRelease, setBookRelease] = useState('')
    const [BookWriter, setBookWriter] = useState('')
    const [Book_categoryId, setCategoryId] = useState('')
    const [chooseData, setChooseData] = useState('Kategori Seçiniz...')
    const [isModalVisible, setisModalVisible] = useState(false)
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({

            title: 'Kitap Ekle',
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
        setBookId(bookSnapshot.size + 1);
    }



    const getCategoryId = () => {
        if (chooseData == "Fantastik") {
            return 1;
        }
        else if (chooseData == "Bilim Kurgu") {
            return 2;
        }
        else if (chooseData == "Polisiye") {
            return 3;
        }
        else if (chooseData == "Korku") {
            return 4;
        }
        else if (chooseData == "Eğitim") {
            return 5;
        }
    }

    const WriteData = async () => {
        getCategoryId();

        await setDoc(doc(db, "BookProject", BookName), {
            bookId: BookId,
            bookName: BookName,
            bookWriter: BookWriter,
            bookPage: BookPage,
            bookRelease: BookRelease,
            bookImageUrl: BookImageUrl,
            book_categoryId: getCategoryId(),
            bookDescription: BookDescription,

        });
        alert('Kitap Ekleme işleminiz gerçekleşmektedir. Lütfen bekleyiniz');

        const querySnapshot = await getDocs(collection(db, "UserToken"));

        var expoPushToken = [];
        await querySnapshot.forEach(async (doc) => {
            expoPushToken.push(doc.data().token);
        });

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: 'Yeni kitaplar sizi bekliyor',
            body: 'Sistemimize yeni eklenen kitaplardan sen de seçimini yap!',
            data: { someData: 'goes here' },
        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        alert('Kitap Ekleme işlemi başarıyla gerçekleşmiştir'),
            navigation.goBack()

    }

    useEffect(() => {
        GetData();
    }, [])

    const changeModalVisibility = (bool) => {
        setisModalVisible(bool)
    }

    const setData = (option) => {
        setChooseData(option)
    }

    return (
        <KeyboardAvoidingView style={styles.container} behaviour='padding'>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Kitap Adı' style={styles.input} value={BookName} onChangeText={text => setBookName(text)} />
                <TextInput placeholder='Yazar Adı' style={styles.input} value={BookWriter} onChangeText={text => setBookWriter(text)} />
                <TextInput placeholder='Sayfa Sayısı' style={styles.input} value={BookPage} onChangeText={text => setBookPage(text)} />
                <TextInput placeholder='Basım Tarihi' style={styles.input} value={BookRelease} onChangeText={text => setBookRelease(text)} />
                <TextInput placeholder='Kitap Resmi (URL)' style={styles.input} value={BookImageUrl} onChangeText={text => setBookImageUrl(text)} />
                <TouchableOpacity style={styles.input} onPress={() => changeModalVisibility(true)}>
                    <Text style={styles.text}>{chooseData}</Text>
                </TouchableOpacity>
                <TextInput placeholder='Kitap Konusu' style={styles.input} value={BookDescription} onChangeText={text => setBookDescription(text)} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={WriteData}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Kitap Ekle</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestClose={() => changeModalVisibility(false)}
            >
                <ModalPicker
                    changeModalVisibility={changeModalVisibility}
                    setData={setData}
                />
            </Modal>
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
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',

        marginTop: 40,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 11,
        borderRadius: 10,
        marginTop: 8,
    },
    button: {
        backgroundColor: 'rgb(255,140,49)',
        width: '100%',
        padding: 13,
        alignItems: 'center',
        borderRadius: 10,

    },
});


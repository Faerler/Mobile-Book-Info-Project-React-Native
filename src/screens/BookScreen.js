import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../components/BackButton/BackButton';

export default function BookScreen(props) {
    const { navigation, route } = props;
    const item = route.params?.item;

    const [categories = [], setCategories] = useState([])
    const [categoryName, setCategory] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({

            title: item.bookName,
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
        const categoriesCol = collection(db, 'Categories');
        const categorySnapshot = await getDocs(categoriesCol);
        const categoryList = categorySnapshot.docs.map(doc => doc.data());

        categoryList.map(data => {
            if (data.categoryId == item.book_categoryId) {
                console.log(data.categoryName);
                setCategory(data.categoryName);
            }
        })

    }

    useEffect(() => {
        GetData();
    }, [])


    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainInfo}>
                <View>
                    <Image source={{ uri: item.bookImageUrl }} style={styles.bookImage} />
                </View>
                <View style={styles.bookInfo}>
                    <View>
                        <Text style={styles.mainTitle}>Kitap Adı:</Text>
                        <Text style={styles.textStyle}>{item.bookName}</Text>
                    </View>
                    <View>
                        <Text style={styles.mainTitle}>Yazar Adı:</Text>
                        <Text style={styles.textStyle}>{item.bookWriter}</Text>
                    </View>
                </View>
            </View>
            <View>
                <View >
                    <Text style={styles.subTitle}>Kategori:</Text>
                    <Text style={styles.subText}>{categoryName}</Text>
                </View>
                <View style={styles.border} />
                <View >
                    <Text style={styles.subTitle}>Sayfa Sayısı:</Text>
                    <Text style={styles.subText}>{item.bookPage}</Text>
                </View>
                <View style={styles.border} />
                <View>
                    <Text style={styles.subTitle}>Yayın Yılı:</Text>
                    <Text style={styles.subText}>{item.bookRelease}</Text>
                </View>
                <View style={styles.border} />
                <View>
                    <Text style={styles.subTitle}>Konusu:</Text>
                    <Text style={styles.subText}>{item.bookDescription}</Text>
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgb(255,140,49)',
        height: 250,
    },
    bookImage: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        resizeMode: "contain",
        width: 160,
        height: 230,
        borderRadius: 20,
    },
    subText: {
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 5,
    },
    subTitle: {
        fontWeight: 'bold',
        margin: 10,
    },
    bookInfo: {
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 10,
    },
    mainTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        marginBottom: 25,
    },
    border: {
        marginRight: 10,
        marginLeft: 10,
        borderBottomColor: '#DBD9D7',
        borderBottomWidth: 1,
    }
});
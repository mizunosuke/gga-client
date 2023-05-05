import { TouchableOpacity, View, Image, StyleSheet } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Button } from "react-native-paper";

export const TitlePost = () => {

    const [ showImage, setShowImage ] = useState("");

      //ライブラリから写真を選択
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        exif: true, 
        base64: true,
        });

        if (!result.cancelled) {
        setShowImage(result.uri);

        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
    
        console.log(result);
        }
    };

    const handlePost = async() => {
        const res = await axios.post("https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/titles", {
            titleUri: showImage
        });
        console.log(res.data);
    }

    return (
        <>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            {showImage ? (
            <Image source={{ uri: showImage }} style={styles.image} />
            ) : (
            <AntDesign name="camera" size={48} color="#ccc" />
            )}
        </TouchableOpacity>

        <View style={styles.footer}>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Ionicons name="md-images" size={30} color="#fff" />
            </TouchableOpacity>
            <Button onPress={handlePost}>保存</Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: 40,
    },
    postB: {
        backgroundColor: "#3498db",
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
    },
    postButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,   
    },
    imageButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    menuTitle: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
        color: '#333',
    },
    icon: {
        marginLeft: 20
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
        photoButton: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex: 1,
        marginLeft: 10,
    },
    commentContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
        height: 200,
        marginBottom: 30
    },
    commentTitle: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
        color: '#333',
        paddingTop: 3
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    spinnerTextStyle: {
        fontSize: 28,
        fontWeight: "bold"
    }  
});
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthProvider';


export const PostHome = (props) => {

  const { currentUser } = useContext(AuthContext);

  //入力内容などの状態管理
  const [ image, setImage ] = useState(null);
  const [ showImage, setShowImage ] = useState(null);
  const [ fishType, setFishType ] = useState('');
  const [ color, setColor ] = useState('');
  const [ region, setRegion ] = useState('');
  const [ comment, setComment ] = useState(''); 
  const [ exif, setExif ] = useState('');
  const [ date, setDate ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  console.log(isLoading);
  

  const navigation = useNavigation();

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
  
      console.log(base64Image);
      console.log(result);
      setImage(base64Image);
      setExif(result.exif);
      setDate(result.assets[0].exif.DateTimeOriginal);
    }
  };

  //カメラから写真を選択
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted' || cameraRollStatus !== 'granted') {
      alert('Camera and camera roll permission is required!');
      return;
    }
     const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      exif: true, 
      base64: true,
    });

    if (!result.cancelled) {
      // Set the resized image as the show image
      setShowImage(result.uri);

      // Get the base64 representation of the resized image
      const base64Image = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(base64Image);
      console.log(result);
      setImage(base64Image);
      setExif(result.exif);
    }
  };

  //魚種選択
  const showFishList = () => {
    navigation.navigate("FishList");
  }

  //色選択
  const showColorList = () => {
    navigation.navigate("ColorList");
  }

  //地域選択
  const showRegionList = () => {
    navigation.navigate("RegionList");
  }


  //データ解析・投稿処理
  const handlePost = async() => {
      try {
        setIsLoading(true);
        //まず輪郭検出のために画像をその他の情報を送る
        const lengths = await axios.post("https://gr-api-381909.an.r.appspot.com", {
          color: color,
          image: image,
          exif: exif
        });
  
        console.log(lengths);

        const response = await axios.post('https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/posts',{
            user_id: currentUser.id,
            attachment: showImage,
            color: color,
            area: region,
            comment: comment,
            size: lengths.data.result,
            day_of_fishing: date,
            fish_name: fishType,
        });
        console.log(response);

        setIsLoading(false);
        setImage(null);
        setFishType("");
        setExif(null);
        setColor("");
        setComment("");
        setRegion("");
        setShowImage("");
        setDate("");

        Alert.alert(
            '投稿完了！！',
            '解析と投稿が完了しました！自分の順位を見てみよう！',
        );
      } catch (error) {
          console.log(error);
          setError(error);
          Alert.alert(
              'この画像は使用できません'
          )
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
    if (props.route.params?.kind) {
      setFishType(props.route.params.kind);
    }
  }, [props.route.params?.kind]);

  useEffect(() => {
    if (props.route.params?.color) {
      setColor(props.route.params.color);
    }
  }, [props.route.params?.color]);

  useEffect(() => {
    if (props.route.params?.region) {
      setRegion(props.route.params.region);
    }
  }, [props.route.params?.region]);

  return (
    <>
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>New Post</Text>
            <TouchableOpacity onPress={handlePost} style={styles.postB}>
            <Text style={styles.postButton}>投稿</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            {image ? (
            <Image source={{ uri: showImage }} style={styles.image} />
            ) : (
            <AntDesign name="camera" size={48} color="#ccc" />
            )}
        </TouchableOpacity>

        <View style={styles.footer}>
            <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <AntDesign name="camera" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Ionicons name="md-images" size={30} color="#fff" />
            </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={styles.content} behavior={"height"} >
        <TouchableOpacity style={styles.menuItem} onPress={showFishList}>
            <MaterialCommunityIcons name="fish" size={24} color="#000" style={styles.icon} />
            {fishType ? (
                <Text style={styles.menuTitle}>{fishType}</Text>
            ) : (
                <Text style={styles.menuTitle}>魚種を選択</Text>
            )}
            <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={showColorList}>
            <MaterialCommunityIcons name="palette" size={24} color="#000" style={styles.icon} />
            {color ? (
                <Text style={styles.menuTitle}>{color}</Text>
            ) : (
                <Text style={styles.menuTitle}>魚体の色味を選択</Text>
            )}
            <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={showRegionList}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#000" style={styles.icon} />
            {region ? (
                <Text style={styles.menuTitle}>{region}</Text>
            ) : (
                <Text style={styles.menuTitle}>エリアを選択</Text>
            )}
            <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentContainer}>
            <View style={{
                flexDirection: "row",
                marginBottom: 15,
            }}>
                <Ionicons name="ios-chatbubble-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.commentTitle}>コメント</Text>
            </View>
            <TextInput style={styles.input} placeholder="コメントを入力(85文字以内)" onChangeText={(text) => setComment(text)} value={comment} multiline={true} numberOfLines={4} />  
        </TouchableOpacity>
        </KeyboardAvoidingView>
    </ScrollView>
    <Spinner 
    visible={isLoading}
    textContent={'Loading...'}
    textStyle={styles.spinnerTextStyle}
    />
    </>
 );
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

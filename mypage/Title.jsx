import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthProvider';


export const Title = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [allTitle, setAllTitle] = useState([]);

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  //称号データの取得
  const fetchTitle = async() => {
      const res = await axios.get('https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/user/title');
      setAllTitle(res.data);
      setSelectedImage(res.data[0].title_icon_path)
  }

  const fetchUserTitle = async(id) => {
      const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/user/${id}/title`);
      console.log(res.data);
      setCurrentImage(res.data);
  }

  useEffect(() => {
      fetchTitle();
      fetchUserTitle(currentUser.id);
  },[])

  const navigation = useNavigation();

  const ProfileImage = ({ source, selected }) => (
    <TouchableOpacity onPress={() => handleImagePress(source)}>
      <View style={[styles.imageContainer, selected && styles.selectedImage]}>
        <Image source={{uri:source}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const ProfileImageSelection = ({ currentImage, newImage }) => (
    <View style={styles.profileImageSelection}>
      <View style={styles.profileImageContainer}>
        <Text style={styles.profileImageLabel}>Current Profile Image</Text>
        <Image source={{uri:currentImage}} style={styles.profileImage} />
      </View>
      <View style={styles.profileImageContainer}>
        <Text style={styles.profileImageLabel}>New Profile Image</Text>
        <Image source={{uri:newImage}} style={styles.profileImage} />
      </View>
    </View>
  );

  const handleImagePress = (source) => {
    setSelectedImage(source);
    setNewImage(source);
  };

  const handleSave = async(id) => {
      const res = await axios.put(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/user/${id}/title`, {
          title: newImage
      });
      console.log(res);
      navigation.navigate("MypageHome");
  }

  return (
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>称号一覧</Text>
        <TouchableOpacity onPress={() => handleSave(currentUser.id)} style={styles.postB}>
        <Text style={styles.postButton}>保存</Text>
        </TouchableOpacity>
    </View>
      <View style={styles.imageGrid}>
        {allTitle.map((image) => (
          <ProfileImage
            key={image.id}
            source={image.title_icon_path}
            selected={selectedImage === image.title_icon_path}
          />
        ))}
      </View>
      <ProfileImageSelection currentImage={currentImage} newImage={newImage} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 50
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 2,
  },
  selectedImage: {
    borderColor: '#000',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImageSelection: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  profileImageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
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
        marginLeft: 70,
    },
    postB: {
        backgroundColor: "#3498db",
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 20
    },
    postButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,   
    },
});
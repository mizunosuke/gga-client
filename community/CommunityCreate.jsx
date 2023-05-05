import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../Auth/AuthProvider';

export const CommunityCreate = ({ route }) => {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  const { selectedFollowers } = route.params;
  console.log(selectedFollowers);

  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // グループを作成する関数
  const createGroup = async() => {
    // TODO: グループを作成する処理を実装する
    const res = await axios.post("https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/community", {
        groupName: groupName,
        groupDescription: groupDescription,
        selectedFollowers: selectedFollowers,
        creator_id: currentUser.id
    });
    console.log(res);
    navigation.navigate("CommunityHome", {
        groupName:groupName
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>グループ名</Text>
      <TextInput value={groupName} onChangeText={setGroupName} style={styles.input} />
      <Text style={styles.label}>グループ説明</Text>
      <TextInput value={groupDescription} onChangeText={setGroupDescription} style={styles.input} />
      <Text style={styles.label}>メンバー</Text>
      {selectedFollowers.map((follower) => (
        <TouchableOpacity key={follower.id} style={styles.follower}>
          <Image source={{ uri: follower.avatar }} style={styles.avatar} />
          <Text style={styles.followerName}>{follower.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={createGroup} style={styles.button}>
        <Text style={styles.buttonText}>グループを作成する</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  follower: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  followerName: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

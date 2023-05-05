import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export const FollowerList = (props) => {

  const navigation = useNavigation();

  // フォロワーリストの仮データ
  const [followerList, setFollowerList] = useState([]);

  //ログインユーザーのフォロワーを取得する関数
  const fetchFollower = async(id) => {
      const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/follower/${id}`);
      console.log(res.data);
      setFollowerList(res.data);
  }

  // フォロワーを選択した際に呼び出される関数
  const toggleFollower = (followerId) => {
    setFollowerList(
      followerList.map((follower) =>
        follower.id === followerId ? { ...follower, selected: !follower.selected } : follower
      )
    );
  };

  // グループ作成画面に遷移する関数
  const navigateToGroupCreation = () => {
    const selectedFollowers = followerList.filter((follower) => follower.selected);
    navigation.navigate('CommunityCreate', { selectedFollowers });
  };

  useEffect(() => {
      fetchFollower(props.route.params.user.id);
  },[])

  const RenderItem = ({name, selected, id}) => {
    return (
        <TouchableOpacity onPress={() => toggleFollower(id)}>
        <View style={styles.followerItem}>
        <Ionicons name={selected ? 'checkbox' : 'checkbox-outline'} size={24} color="black" />
        <Text style={styles.followerName}>{name}</Text>
        </View>
        </TouchableOpacity>
      )   
  }

  return (
    <View style={styles.container}>
      <View style={styles.postDetail}>
        <Text style={styles.postDetailText}>フォロワー</Text>
      </View>
      <FlatList
        data={followerList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <RenderItem
            name={item.name}
            selected={item.selected}
            id={item.id}
            />
        )}
      />
      <TouchableOpacity onPress={navigateToGroupCreation} style={styles.createButton}>
        <Text style={styles.createButtonText}>グループを作成する</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  followerName: {
    marginLeft: 10,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600
  },
  postDetail: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    },
  postDetailText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 15
  },
});

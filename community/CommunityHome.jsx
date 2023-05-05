import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Auth/AuthProvider';
import { useContext, useState, useEffect } from "react";
import axios from 'axios';

export const CommunityHome = (props) => {

    const navigation = useNavigation();
    
    const [ community, setCommunity ] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    //認証情報の追加
    const { currentUser } = useContext(AuthContext);


    //communityデータの取得
    const fetchCommunity = async(id) => {
        const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/community/${id}`);
        console.log(res);
        setCommunity(res.data);
    }

    //トークルームに入る
    const goTalk = (id) => {
        navigation.navigate("TalkRoom", {
            user: currentUser,
            community_id: id
        });
    }

    //新規グループ作成
    const addGroup = () => {
        navigation.navigate("FollowerList", {
            user: currentUser,
        });
    }

    //データの再取得
    const onRefresh = async() => {
        setRefreshing(true);
        await fetchCommunity(currentUser.id);
        setRefreshing(false);
    }

    useEffect(() => {
        // const interval = setInterval(() => {
        //     fetchCommunity(currentUser.id);
        // }, 60000); // 1秒ごとにメッセージを取得する
        // return () => clearInterval(interval);
        fetchCommunity(currentUser.id);
      }, []);

    const Communities = ({id, name, description, creator_user_id}) => {

        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuItem} onPress={() => goTalk(id)}>
                <Avatar.Image size={60} source={require("../assets/background.png")} style={styles.icon} />
                <Text style={styles.menuTitle}>{name}</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
        </View>
        )
    }

    return (
    <>
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <FontAwesome name="th-list" size={24} color="black"/>
                <Text style={styles.title}>コミュニティ一覧</Text>
            </View>
            <View style={styles.addGroup}>
                <TouchableOpacity onPress={addGroup} style={{flexDirection: "row"}}>
                    <AntDesign name="addusergroup" size={24} color="white" style={{alignSelf: "center", paddingLeft: 3}}/>
                    <Text style={styles.groupText}>新規グループ作成</Text>
                </TouchableOpacity>
            </View>
        </View>
        <FlatList
        data={community}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Communities
        id={item.id}
        name={item.name}
        description={item.description}
        creator_user_id={item.creator_user_id}
        />
        )}
        refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        />
    </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      paddingHorizontal: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#DDD',
    },
    menuTitle: {
      flex: 1,
      marginLeft: 20,
      fontSize: 18,
      fontWeight: 600,
      color: '#333',
    },
    icon: {
        marginLeft: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD"
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'left',
        flex: 1,
        paddingLeft: 10
    },
    headerTitle: {
        width: "60%",
        flexDirection: "row",
        paddingLeft: 30
    },
    addGroup: {
        width: "35%",
        flexDirection: "row",
        backgroundColor: "blue",
        height: 50,
        borderRadius: 10,
        marginHorizontal: 10
    },
    groupText: {
        fontSize: 14,
        textAlign: "center",
        alignSelf: "center",
        paddingLeft: 5,
        color: "white",
        fontWeight: 600
    }
  });
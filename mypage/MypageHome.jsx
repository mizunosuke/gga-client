import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useState } from "react";
import { Avatar } from 'react-native-paper';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react"
import axios from "axios";


export const MypageHome = () => {

    //認証情報の追加
    const { handleLogout, currentUser } = useContext(AuthContext);
    console.log(currentUser);
    const navigation = useNavigation();

    const route = useRoute();
    const [refreshing, setRefreshing] = useState(false);
    const [ titleIcon, setTitleIcon ] = useState(currentUser.title_icon);

    const fetchTitleIcon = async(id) => {
        const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/user/${id}`);
        console.log(res);
        setTitleIcon(res.data.title_icon);
    }

    const onRefresh = () => {
        setRefreshing(true); // stateを更新する
        fetchTitleIcon(currentUser.id);
        setRefreshing(false); // stateを更新する
    }


    //ログアウト処理
    const logout = () => {
        handleLogout();
    }

    //称号一覧
    const showTitle = (id) => {
        navigation.navigate("Title", {
            user_id: id
        });
    }

    //称号一覧
    const showRecord = (id) => {
        navigation.navigate("Record", {
            user_id: id
        });
    }

    const goPost = () => {
        navigation.navigate("TitlePost");
    }

  return (
      <>
      <ScrollView 
      style={styles.container} 
      scrollEnabled={true}  // onRefreshを追加する
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
        <View style={styles.container}>
            {titleIcon ? (<Image source={{uri: titleIcon}} style={{
                position: "absolute",
                top: 30,
                left: 10,
                width: 180,
                height: 180,
                borderWidth: 2,
                borderRadius: "10%",
                borderColor: "#DDD"
            }}/>) : (<Image source={require("../assets/cardback.png")} style={{
                position: "absolute",
                top: 30,
                left: 10,
                width: 180,
                height: 180,
                borderWidth: 2,
                borderRadius: "10%",
                borderColor: "#DDD"
            }}/>)}
            
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                {currentUser.icon_path ? (<Avatar.Image source={{uri: currentUser.icon_path}} size={120} color="#333" style={{alignSelf: "center"}}/>) : (<Ionicons name="person-circle-outline" size={80} color="#333" style={{alignSelf: "center"}}/>)}
                </View>
                <Text style={styles.profileName}>{currentUser.name}</Text>
                <View style={{
                    width: 300,
                    alignItems: "flex-end",
                    paddingRight:0
                }}>
                    <Text style={styles.profileUsername}>登録エリア：{currentUser.area}</Text>
                </View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>108</Text>
                <Text style={styles.statTitle}>Following</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>879</Text>
                <Text style={styles.statTitle}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                <Text style={styles.statNumber}>234</Text>
                <Text style={styles.statTitle}>Tweets</Text>
                </View>
            </View>
        </View>

        
        <View>
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="ios-person-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>プロフィール編集</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => showTitle(currentUser.id)}>
                <Ionicons name="ios-notifications-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>称号一覧</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => showRecord(currentUser.id)}>
                <Ionicons name="ios-lock-closed-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>過去の成績</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="ios-help-circle-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>参加中のランキング</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={logout}>
                <Ionicons name="ios-information-circle-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>ログアウト</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={goPost}>
                <Ionicons name="ios-information-circle-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>称号保存</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
        </View>
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    menuTitle: {
        flex: 1,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 400,
        color: '#333',
    },
    icon: {
        marginLeft: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    profileImageContainer: {
        backgroundColor: '#EEE',
        width: 110,
        height: 110,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 10,
        alignItems: 'flex-end',
        alignSelf: "flex-end",
        marginRight: 45,
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        marginLeft:170,
        justifyContent: "center"
    },
    profileUsername: {
        fontSize: 16,
        color: '#666',
        marginBottom: 6,
        marginTop: 5,
    },
    profileBio: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    followContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    followButton: {
        backgroundColor: '#1DA1F2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    followButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageButton: {
        backgroundColor: '#1DA1F2',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    statItem: {
        alignItems: 'center',
    },
        statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statTitle: {
        fontSize: 16,
        color: '#666',
    },
  });
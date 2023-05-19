import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { Avatar } from 'react-native-paper';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";


export const UserPage = (props) => {

    const navigation = useNavigation();

    const route = useRoute();
    const { user } = route.params;
    console.log(user);

    const { currentUser } = useContext(AuthContext);

    //フォロー関係の処理
    const [ isFollowing, setIsFollowing ] = useState(false);

    //follow状態をとってくる
    const fetchFollow = async(id) => {
        const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/users/${id}/follow`, {
            params: {
                currentUserId: currentUser.id
            }
        });
        console.log(res.data);
        setIsFollowing(res.data.follow);
    }



    const followUser = async(id) => {
        const res = await axios.post(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/users/${id}/follow`, {
            id: currentUser.id,
        });
        console.log(res);
        setIsFollowing(true);
      }

    const unfollowUser = async(id) => {
        
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

    useEffect(() => {
        fetchFollow(user.id);
    },[]);

  return (
      <>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImageContainer}>
                {user.icon_path ? (<Avatar.Image source={{uri: user.icon_path}} size={120} color="#333" style={{alignSelf: "center"}}/>) : (<Ionicons name="person-circle-outline" size={80} color="#333" style={{alignSelf: "center"}}/>)}
                </View>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileUsername}>@johnsmith</Text>
                <Text style={styles.profileBio}>
                はじめまして！シーバスメインで釣りをしています。
                </Text>
                <View style={styles.followContainer}>
                <TouchableOpacity
                style={isFollowing ? [styles.followButton, styles.followButtonActive] : styles.followButton}
                onPress={() => isFollowing ? unfollowUser(user.id) : followUser(user.id)}
                >
                <Text style={styles.followButtonText}>{isFollowing ? 'フォロー中' : 'フォローする'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton}>
                    <Ionicons name="mail-outline" size={24} color="#FFF" />
                </TouchableOpacity>
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
            <TouchableOpacity style={styles.menuItem} onPress={() => showTitle(currentUser.id)}>
                <Ionicons name="ios-notifications-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>称号一覧</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => showTitle(currentUser.id)}>
                <Ionicons name="ios-lock-closed-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>過去の成績</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="ios-globe-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>所属コミュニティ一覧</Text>
                <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="ios-help-circle-outline" size={24} color="#666" style={styles.icon}/>
                <Text style={styles.menuTitle}>参加中のランキング</Text>
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
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    profileUsername: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    profileBio: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
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
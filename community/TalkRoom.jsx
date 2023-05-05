import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export const TalkRoom = (props) => {
    console.log(messages);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    //コミュニティのトークメッセージを全て取得
    const fetchMessage = async(id) => {
        const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/community/${id}/messages`);
        console.log(res.data);
        setMessages(res.data);
    }
  
    const flatListRef = useRef(null);
  
    useEffect(() => {
      // スクロールを最下部にする
      if (messages.length > 0 && flatListRef.current !== null) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, [messages]);

    useEffect(() => {
        fetchMessage(props.route.params.community_id);
    },[]);
  
    //メッセージを保存
    const sendMessage = async(id) => {
        const res = await axios.post(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/community/${id}/messages`, {
            user_id: props.route.params.user.id,
            content: message,
        });
        console.log(res);
        await fetchMessage(props.route.params.community_id);
        setMessage('');
    };
  
    const renderItem = ({ item }) => {
      return (
        <View style={[styles.messageContainer, item.user_id === props.route.params.user.id ? styles.myMessageContainer : styles.otherMessageContainer]}>
          <Text style={[styles.messageText, item.user_id === props.route.params.user.id ? styles.myMessageText : styles.otherMessageText]}>{item.content}</Text>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="ios-arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Group Chat</Text>
          <TouchableOpacity>
            <Ionicons name="md-people" size={24} color="#000" />
          </TouchableOpacity>
        </View>
  
        <KeyboardAvoidingView style={styles.content} behavior={"height"} keyboardVerticalOffset={80}>
          <FlatList
            ref={flatListRef}
            style={styles.messageList}
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
  
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              onChangeText={(text) => setMessage(text)}
              value={message}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(props.route.params.community_id)}>
              <Ionicons name="ios-send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    content: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    messageList: {
      flex: 1,
    },
    messageContainer: {
      maxWidth: '80%',
      minWidth: '20%',
      backgroundColor: '#eee',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    myMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#007aff',
    },
    otherMessageContainer: {
      alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    myMessageText: {
        color: '#fff',
    },
    otherMessageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#007aff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
});
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Auth/AuthProvider';

export const Comment = (props) => {
    console.log(currentUser);
    const { currentUser } = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);


    const handleCommentChange = (text) => {
      setComment(text);
    };
  
    //コメントの投稿
    const handleCommentSubmit = async(id) => {
      // ここでコメントを送信するAPIを呼び出し、コメントを投稿する処理を実装する
      const res = await axios.post(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/posts/${id}/comments`, {
          user_id: currentUser.id,
          content: comment
      });
      console.log(res);
      console.log('Comment submitted:', comment);
      setComment('');
      fetchComments(id);
    };

    //コメントの取得
    const fetchComments = async(id) => {
        const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/posts/${id}/comments`);
        console.log(res);
        setComments(res.data.comment);
      };

      useEffect(() => {
        fetchComments(props.route.params.post_id);
      }, []);
  
    return (
    <ScrollView style={styles.container}>
    <KeyboardAvoidingView style={styles.content} behavior={"padding"} >
      <View style={styles.container}>
        {/* 投稿の詳細情報 */}
        <View style={styles.postDetail}>
          <Text style={styles.postDetailText}>投稿の詳細情報が表示されます</Text>
        </View>
  
        {/* コメント一覧 */}
        <View style={styles.commentList}>
          <Text style={styles.commentHeaderText}>コメント</Text>
          {comments && comments.length > 0 && comments.map((comment) => (
            <View style={styles.comment} key={comment.id}>
                <Icon name="person-circle-outline" size={40} color="#333" />
                <View style={styles.commentBody}>
                <Text style={styles.commentAuthor}>{comment.user.name}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <Text style={styles.commentTimestamp}>{comment.created_at}</Text>
                <View style={styles.commentAction}>
                    <Text style={styles.commentActionText}>返信する</Text>
                </View>
                </View>
            </View>
           ))}
  
          {/* コメント返信 */}
          
            <View style={styles.commentReply}>
                <Icon name="person-circle-outline" size={40} color="#333" />
                <View style={styles.commentReplyBody}>
                <TextInput
                    style={styles.commentReplyInput}
                    placeholder="コメントを返信する"
                    value={comment}
                    onChangeText={handleCommentChange}
                />
                <Button title="返信する" onPress={() => handleCommentSubmit(props.route.params.post_id)} />
                </View>
            </View>
        </View>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  };
  
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
postDetail: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
},
postDetailText: {
    fontWeight: 'bold',
    fontSize: 18,
},
commentList: {
    flex: 1,
    marginTop: 10,
    padding: 10,
},
commentHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
},
comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
commentBody: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
},
commentAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
},
commentText: {
    fontSize: 14,
    marginTop: 5,
},
commentTimestamp: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
},
commentAction: {
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
},
commentActionText: {
    color: '#333',
    fontSize: 12,
},
commentReply: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 10,
},
commentReplyBody: {
    flex: 1,
    marginLeft: 10,
},
commentReplyInput: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
},
});
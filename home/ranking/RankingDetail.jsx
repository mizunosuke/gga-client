import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native';
import { Foundation, SimpleLineIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as React from "react"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

export const RankingDetail = (props) => {

  const navigation = useNavigation();
  const { fish_id } = props.route.params;
  const { fish_name } = props.route.params;


  const [ detailData, setDetailData ] = React.useState([]);



  //投稿データ取得
  const fetchDetailData = async(id) => {
    const res = await axios.get(`https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/posts/${id}`);
    console.log(res);
    res.data.map((ranking, index) => {
      ranking["index"] = index;
    });
    setDetailData(res.data);
  }

  //コメントページに移動
  const postComments = (id) => {
    navigation.navigate('Comment', {
      post_id: id
    })
  }

  //ユーザーページ移動
  const showUser = (user) => {
    navigation.navigate("UserPage", {
      user: user
    })
  }

  React.useEffect(() => {
    fetchDetailData(fish_id);
  }, []);


  const RankingCard= (item) => {
    const titleData = [
      require("../../assets/title1.png"),
      require("../../assets/title2.png"),
      require("../../assets/title3.png")
    ];

    
    
    const randomTitle = titleData[Math.floor(Math.random() * titleData.length)];

    const randomNum = Math.floor(Math.random() * 100) + 1;
    return (
      <View style={styles.container}>
        <View style={styles.king}>
            <View style={styles.kingimage}>
              <ImageBackground source={{uri: item.attachment}} style={styles.image}>
                <View style={styles.onImage}>
                  <Foundation name="crown" size={24} color="gold" style={{
                    paddingRight: 10,
                    alignSelf: "center"
                  }}/>
                  <Text style={styles.onImageText}>{item.index + 1}位　{item.size}cm</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.kingAbout}>
              <View style={styles.badge}>
                <SimpleLineIcons name="badge" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <Image source={randomTitle} style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  top: -63,
                  left: 32
                }}/>
              </View>

              <View style={styles.point}>
                <FontAwesome5 name="parking" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                {item.point ? (<Text style={styles.kingAboutText}>{item.points}</Text>) : (<Text style={styles.kingAboutText}>{randomNum}pt</Text>)}
              </View>

              <View style={styles.point}>
                <Feather name="map-pin" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <Text style={styles.kingAboutText}>{item.area}</Text>
              </View>
            </View>

            <View style={styles.userName}>
              <TouchableOpacity onPress={() => showUser(item.user)} style={{flexDirection: "row"}}>
                <Feather name="user" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <Text style={styles.kingAboutText}>{item.user.name}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.comment}>
              <FontAwesome name="comment-o" size={20} color="blue" style={{
                  paddingTop: 10
                }}/>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => postComments(item.post_id)}>
          <FontAwesome name="commenting-o" size={24} color="gray" style={styles.icon} />
                <Text style={styles.menuTitle}>投稿にコメントする</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>  
    );
  };


  return (
    <View style={{backgroundColor: "#F3F2F2"}}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={28} color="#000" style={{
              marginLeft: 20
            }}/>
            </TouchableOpacity>
            <Text style={styles.title}>{fish_name}</Text>
      </View>
      <FlatList
        data={detailData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <RankingCard
          attachment={item.attachment}
          area={item.area}
          size={item.size}
          user={item.user}
          comment={item.comment}
          points={item.points}
          index={item.index}
          post_id={item.id}
        />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    height:630,
    marginBottom: 70
  },
  title: {
    paddingLeft: 15,
    alignItems: "center",
    height: "10%",
    flexDirection: "row"
  },
  titleText: {
    paddingVertical: 10,
    color: "#08073D",
    fontSize: 22,
    fontWeight: 700
  },
  moreButton: {
    backgroundColor: 'blue',
    marginLeft: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  moreButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
  },
  king: {
    flexDirection: "column",
    height: "95%",
    width: "100%",
  },
  kingimage: {
    width: "100%",
    height: "65%"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  kingAbout: {
    height: "10%",
    flexDirection: "row",
    paddingLeft: 10
  },
  badge: {
    flexDirection: "row",
    width: "30%",
    paddingLeft: 5
  },
  userName: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    height: "5%"
  },
  kingAboutText: {
    fontSize:  18,
    fontWeight: 600,
    paddingLeft: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  point: {
    flexDirection: "row",
    width: "30%",
    paddingLeft: 25
  },
  comment: {
    flexDirection: "row",
    paddingLeft: 15,
    marginTop: 15,
    height: "20%",
    width: "90%"
  },
  commentText: {
    paddingLeft: 10,
    paddingTop: 10,
    letterSpacing: 1.3
  },
  onImage: { 
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "black",
    flexDirection: "row",
    height: 50,
    opacity: 0.8
  },
  onImageText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    alignSelf: "center", 
    paddingRight: 5, 
    fontSize: 25 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: "white"
  },
  title: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
      paddingRight: 35
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
      color: 'gray',
  },
  icon: {
      marginLeft: 15
  },
});
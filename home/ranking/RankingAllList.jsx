import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ImageBackground, RefreshControl } from 'react-native';
import { Foundation, SimpleLineIcons, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import * as React from "react"
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Auth/AuthProvider';
import axios from 'axios';

export const RankingAllList = () => {

  const [ rankingData, setRankingData ] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showAllComments, setShowAllComments] = React.useState(false);
  const MAX_COMMENT_LENGTH = 80; // 最大表示文字数
  console.log(rankingData);

  //ランキングデータの全件取得
  const fetchAllRanking = async() => {
    const res = await axios.get("https://cd53-2404-7a87-662-1500-694a-cc60-562f-ff70.ngrok-free.app/api/ranking");
    setRankingData(res.data);
  }

  //データの再取得
  const onRefresh = async() => {
    setRefreshing(true);
    await fetchAllRanking();
    setRefreshing(false);
  }

  React.useEffect(() => {
    fetchAllRanking();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();

  //詳細ページ移動
  const showDetail = (fish_id, fish_name) => {
    navigation.navigate("RankingDetail", {
      fish_id: fish_id,
      fish_name: fish_name
    });
  }

  //ユーザーページ移動
  const showUser = (user) => {
    navigation.navigate("UserPage", {
      user: user
    })
  }

  const onChangeSearch = query => setSearchQuery(query);

  const RankingItem = ({fish_name, fish_id, posts, participants}) => {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Foundation name="crown" size={34} color="gold" style={{
            paddingRight: 10
          }}/>
          <Text style={styles.titleText}>{fish_name}</Text>
          <TouchableOpacity style={styles.moreButton} onPress={() => showDetail(fish_id, fish_name)}>
              <Text style={styles.moreButtonText}>詳細を見る</Text>
          </TouchableOpacity>
        </View>

        {posts.map((post, index) => {
          if(index === 0) {
            return (
          <View style={styles.king} key={index}>
            <View style={styles.kingimage}>
              <ImageBackground source={{uri: post.attachment}} style={styles.image}>
                <View style={styles.onImage}>
                  <Foundation name="crown" size={24} color="gold" style={{
                    paddingRight: 10,
                    alignSelf: "center"
                  }}/>
                  <Text style={styles.onImageText}>1位　{post.size}cm</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.kingAbout}>
              <View style={styles.badge}>
                <SimpleLineIcons name="badge" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <Text style={styles.kingAboutText}>獲得した称号</Text>
              </View>

              <View style={styles.point}>
                <FontAwesome5 name="parking" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                {post.points ? (<Text style={styles.kingAboutText}>{post.points}pt</Text>) : (<Text style={styles.kingAboutText}>0pt</Text>)}
              </View>

              <View style={styles.point}>
                <Feather name="map-pin" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <Text style={styles.kingAboutText}>{post.area}</Text>
              </View>
            </View>

            <View style={styles.userName}>
                <Feather name="user" size={20} color="blue" style={{
                  alignSelf: "center"
                }}/>
                <TouchableOpacity style={{alignSelf: "center"}} onPress={() => showUser(post.user[0])}>
                <Text style={styles.kingAboutText}>{post.user[0].name}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.comment}>
              <FontAwesome name="comment-o" size={20} color="blue" style={{
                  paddingTop: 10
                }}/>
              {showAllComments ? (
              <Text style={styles.commentText}>{post.comment}</Text>
              ) : (
                <Text style={styles.commentText}>{post.comment.substring(0, MAX_COMMENT_LENGTH)}</Text>
              )}
              {post.comment.length > MAX_COMMENT_LENGTH && !showAllComments && (
                <TouchableOpacity onPress={() => setShowAllComments(true)}>
                  <Text style={styles.showMoreText}>show more</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
            )
          }
        })}

        <View style={styles.secondthird}>
          {posts.map((post, index) => {
            if(index === 1 || index === 2) {
              return (
                <View style={styles.second} key={index}>
                  <View style={styles.secondimage}>
                    <ImageBackground source={{uri: post.attachment}} style={styles.secondImage}>
                      <View style={styles.onImageSecond}>
                        <Foundation name="crown" size={24} color="silver" style={{
                          paddingRight: 10,
                          alignSelf: "center"
                        }}/>
                        <Text style={styles.onImageTextSecond}>{index + 1}位　{post.size}cm</Text>
                      </View>
                    </ImageBackground>
                  </View>
                  <View style={styles.secondAbout}>
                    <View style={styles.secondbadge}>
                      <SimpleLineIcons name="badge" size={13} color="blue" style={{
                        alignSelf: "center"
                      }}/>
                      <Text style={styles.secondAboutText}>獲得した称号</Text>
                    </View>

                    <View style={styles.secondpoint}>
                      <FontAwesome5 name="parking" size={13} color="blue" style={{
                        alignSelf: "center"
                      }}/>
                      {post.points ? (<Text style={styles.secondAboutText}>{post.points}</Text>) : (<Text style={styles.secondAboutText}>0pt</Text>)}
                    </View>
                  </View>

                  <View style={styles.userName}>
                      <Feather name="user" size={13} color="blue" style={{
                        alignSelf: "center"
                      }}/>
                      <TouchableOpacity style={{alignSelf: "center"}} onPress={() => showUser(post.user[0])}>
                      <Text style={styles.secondAboutText}>{post.user[0].name}</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.userName}>
                      <Feather name="map-pin" size={13} color="blue" style={{
                        alignSelf: "center"
                      }}/>
                      <Text style={styles.secondAboutText}>{post.area}</Text>
                  </View>
                </View>
              )
            }
          })}
        </View>
        </View>
    );
  };

  return (
    <View style={{
      backgroundColor: "#F3F2F2"
    }}>
    <Searchbar
      placeholder="魚種名でランキングを検索"
      onChangeText={onChangeSearch}
      value={searchQuery}
      placeholderTextColor="#cdcdcd"
      fontWeight="300"
      style={{
        borderRadius: 0,
        backgroundColor: "#FFF",
        borderBottomColor: "#72A1C2",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: "#72A1C2",
      }}
    />
    <FlatList
      data={rankingData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
      <RankingItem
        fish_name={item.fish_name}
        fish_id={item.fish_id}
        posts={item.posts}
        participants={item.participants}
      />
      )}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
    </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    height: 900,
    marginBottom: 70
  },
  title: {
    paddingLeft: 15,
    alignItems: "center",
    height: "10%",
    flexDirection: "row"
  },
  titleText: {
    width: "50%",
    paddingLeft: 15,
    paddingVertical: 10,
    color: "#08073D",
    fontSize: 22,
    fontWeight: 700
  },
  moreButton: {
    backgroundColor: 'blue',
    marginLeft: 30,
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
    height: "55%",
    width: "100%",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1
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
    flexDirection: "row"
  },
  badge: {
    flexDirection: "row",
    width: "30%",
    paddingLeft: 5
  },
  userName: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 5,
    height: "7%"
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
    paddingLeft: 5,
    height: "14%",
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
  secondthird: {
    height: "45%",
    width: "100%",
    flexDirection: "row"
  },
  second: {
    width: "50%",
  },
  secondimage: {
    width: "100%",
    height: "50%"
  },
  secondImage: {
    width: "100%",
    height: "100%",
    borderRightWidth: 2,
    borderRightColor: "#DDD"
  },
  onImageSecond: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "black",
    flexDirection: "row",
    height: 30,
    opacity: 0.8
  },
  onImageTextSecond: {
    color: '#fff', 
    fontWeight: 'bold', 
    alignSelf: "center", 
    paddingRight: 5, 
    fontSize: 15 
  },
  secondAbout: {
    height: "10%",
    flexDirection: "row",
  },
  secondbadge: {
    width: "50%",
    flexDirection: "row",
    paddingLeft: 3
  },
  secondpoint: {
    width: "50%",
    flexDirection: "row"
  },
  secondAboutText: {
    marginVertical: 0,
    alignSelf: "center",
    paddingLeft: 7,
    fontWeight: "600",
  },
  third: {
    width: "50%"
  },
  thirdimage: {
    width: "100%",
    height: "50%"
  },
  thirdImage: {
    width: "100%",
    height: "100%"
  },
  onImageThird: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: "black",
    flexDirection: "row",
    height: 30,
    opacity: 0.8 
  },
  onImageTextThird: {
    color: '#fff', 
    fontWeight: 'bold', 
    alignSelf: "center", 
    paddingRight: 5, 
    fontSize: 12 
  },
  thirdAbout: {
    height: "10%",
    flexDirection: "row"
  },
  thirdbadge: {
    width: "60%",
    flexDirection: "row",
    paddingLeft: 3
  },
  thirdpoint: {
    width: "40%",
    flexDirection: "row"
  },
  thirdAboutText: {
    alignSelf: "center",
    paddingLeft: 7,
    fontWeight: "600",
    fontSize: 11
  },

});

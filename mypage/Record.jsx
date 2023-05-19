import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const DATA = [
  {
    id: '1',
    image: require('../assets/IMG_5681.jpeg'),
    rank: '1 / 10',
    period: '2022/04/01 - 2022/04/07',
    size: 50,
    species: 'マグロ',
    area: "広島",
    comment: "私の人生最大の成果がここに誕生しました"
  },
  {
    id: '2',
    image: require('../assets/IMG_5747.JPG'),
    rank: '3 / 10',
    period: '2022/03/25 - 2022/03/31',
    size: 35,
    species: 'サケ',
    area: "広島",
    comment: "私の人生最大の成果がここに誕生しました"
  },
  {
    id: '3',
    image: require('../assets/IMG_5777.jpeg'),
    rank: '2 / 10',
    period: '2022/03/18 - 2022/03/24',
    size: 70,
    species: 'イカ',
    area: "広島",
    comment: "私の人生最大の成果がここに誕生しました"
  }
];

export const Record = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
        <ImageBackground source={item.image} style={styles.image}>
        <View style={styles.onImage}>
            <Foundation name="crown" size={24} color="gold" style={{
            paddingHorizontal: 10,
            alignSelf: "center"
            }}/>
            <Text style={styles.onImageText}>1位　{item.size}cm</Text>
        </View>
        </ImageBackground>
      <View style={styles.cardInfo}>
      <Foundation name="crown" size={28} color="blue" style={{
          marginRight: 10
      }}/>
        <Text style={styles.rank}>３位</Text>
        <FontAwesome5 name="fish" size={28} color="blue" style={{
            marginHorizontal: 10,
            paddingTop: 3
      }}/>
        <Text style={styles.species}>{item.species}</Text>
      </View>
      <View style={styles.area}>
        <Feather name="map-pin" size={28} color="black" style={{
            marginRight: 10
        }}/>
        <Text style={styles.areaText}>{item.area}</Text>
      </View>

      <View style={styles.comment}>
      <FontAwesome name="comment-o" size={28} color="black" style={{
            marginRight: 10
        }}/>
          <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    </View>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>過去の成績</Text>
        <TouchableOpacity>
          <Feather name="plus" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 390,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  image: {
    width: '100%',
    height: 250
  },
  cardInfo: {
    marginTop: 16,
    flexDirection: "row"
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginRight: 30
  },
  species: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingTop: 2
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailText: {
    fontSize: 16,
    marginRight: 8
    },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    marginHorizontal: 8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
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
  area: {
      flexDirection: "row",
      marginVertical: 5,
  },
  areaText: {
    fontWeight: 'bold', 
    fontSize: 20
  },
  comment: {
    flexDirection: "row",
    marginVertical: 5,
  },
  commentText: {
      alignSelf: "center"
  }
});

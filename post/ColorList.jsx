import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const ColorList = () => {
  const navigation = useNavigation();
  const [ selectedColor, setSelectedColor ] = useState(null); // 選択された魚種をstateで管理

  const data = [
    { id: 1, title: '赤', name: "red"},
    { id: 2, title: '青', name: "blue"},
    { id: 3, title: '黄', name: "yellow"},
    { id: 4, title: '緑', name: "green"},
    { id: 5, title: '茶', name: "brown"},
    { id: 6, title: '黒', name: "black"},
    { id: 7, title: '白', name: "white"},
    { id: 8, title: '深緑', name: "dark-green"},
    { id: 9, title: '銀', name: "silver"},
    { id: 10, title: '青白', name: "white-blue"},
    { id: 11, title: '橙', name: "orange"},
  ];

  const handleColorPress = (color) => {
    setSelectedColor(color); // 選択された魚種をstateにセット
  };

  const renderSectionHeader = () => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>魚体の色味を選択</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => {handleColorPress(item.name)}}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
        {selectedColor === item.name && ( // 選択された魚種を表示
          <Text style={styles.selectedItemText}>(選択中)</Text>
        )}
      </View>
    );
  };

  const handleDecide = () => {
    if (selectedColor) {
      navigation.navigate("PostHome",{
        color: selectedColor
      });
    } else {
      alert('色を選択してください！');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />} // アイテム間にDividerを追加
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={renderSectionHeader}
      />
      <Button
        mode="contained"
        onPress={handleDecide}
        disabled={!selectedColor}
        style={styles.button}>
        決定
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionHeaderContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row', // 横並びにするためにflexDirectionを指定
    justifyContent: 'space-between', // アイテム間のスペースを均等にするために指定
    alignItems: 'center', // アイテムを縦方向に中央揃えするために指定
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1, // アイテムのテキストが長い場合に省略されるようにflexを指定
  },
  selectedItemText: {
    fontSize: 16,
    color: 'green', // 選択された魚種のテキストを緑色にする
  },
  button: {
    marginTop: 16,
  },
});



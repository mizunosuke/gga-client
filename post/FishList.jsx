import React, { useState } from 'react';
import { View, SectionList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const FishList = () => {
  const navigation = useNavigation();
  const [selectedFish, setSelectedFish] = useState(null); // 選択された魚種をstateで管理

  const sections = [
    { title: 'あ', data: ['アイナメ', 'アイゴ', 'イサキ', 'イシダイ'] },
    { title: 'か', data: ['カツオ', 'キス', 'クロダイ'] },
    { title: 'さ', data: ['サバ', 'サッパ', 'サワラ', 'スズキ'] },
    { title: 'た', data: ['タラ', 'タチウオ'] },
    { title: 'な', data: ['ニザダイ', 'ネンブツダイ'] },
    { title: 'は', data: ['ヒラメ', 'フグ'] },
    { title: 'ま', data: ['マゴチ', 'マダイ', 'メバル'] },
    { title: 'や', data: ['タラ', 'カレイ', 'サバ'] },
    { title: 'ら', data: ['タラ', 'カレイ', 'サバ'] },
    { title: 'わ', data: ['タラ', 'カレイ', 'サバ'] },
  ];

  const handleFishPress = (fish) => {
    setSelectedFish(fish); // 選択された魚種をstateにセット
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => {handleFishPress(item)}}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
        {selectedFish === item && ( // 選択された魚種を表示
          <Text style={styles.selectedItemText}>(選択中)</Text>
        )}
      </View>
    );
  };

  const handleDecide = () => {
    if (selectedFish) {
      navigation.navigate("PostHome",{
        kind: selectedFish
      });
    } else {
      alert('魚種を選択してください！');
    }
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <Divider />} // アイテム間にDividerを追加
        stickySectionHeadersEnabled={false}
      />
      <Button
        mode="contained"
        onPress={handleDecide}
        disabled={!selectedFish}
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
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row', // 横並びにするためにflexDirectionを指定
    justifyContent: 'space-between', // アイテム間のスペースを均等にするために指定
    alignItems: 'center', // アイテムを縦方向に中央揃えするために指定
    paddingVertical: 12,
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



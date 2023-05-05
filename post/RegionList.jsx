import React, { useState } from 'react';
import { View, SectionList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const RegionList = () => {
  const navigation = useNavigation();
  const [selectedRegion, setSelectedRegion] = useState(null); // 選択された魚種をstateで管理

  const sections = [
    { title: '北海道', data: ['北海道'] },
    { title: '東北', data: ['青森', '秋田', '岩手', '山形', '宮城', '福島'] },
    { title: '関東', data: ['栃木', '群馬', '茨城', '東京', '埼玉', '千葉', '神奈川'] },
    { title: '中部', data: ['新潟', '石川', '長野', '富山', '福井', '山梨', '岐阜', '静岡', '愛知'] },
    { title: '近畿', data: ['三重', '滋賀', '奈良', '和歌山', '大阪', '京都', '兵庫'] },
    { title: '中国', data: ['岡山', '鳥取', '島根', '広島', '山口'] },
    { title: '四国', data: ['徳島', '愛媛', '香川', '高知'] },
    { title: '九州・沖縄', data: ['福岡', '長崎', '大分', '宮崎', '佐賀', '鹿児島', '熊本', '沖縄'] },
  ];

  const handleRegionPress = (region) => {
    setSelectedRegion(region); // 選択された魚種をstateにセット
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
        <TouchableOpacity onPress={() => {handleRegionPress(item)}}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
        {selectedRegion === item && ( // 
          <Text style={styles.selectedItemText}>(選択中)</Text>
        )}
      </View>
    );
  };

  const handleDecide = () => {
    if (selectedRegion) {
      navigation.navigate("PostHome",{
    region: selectedRegion
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
        disabled={!selectedRegion}
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



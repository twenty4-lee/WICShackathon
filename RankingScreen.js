import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const RankingScreen = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const rankingData = [];
      for (let key in data) {
        rankingData.push({ id: key, name: data[key].name, score: data[key].score });
      }
      rankingData.sort((a, b) => b.score - a.score);
      setRanking(rankingData);
    });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <FlatList
        data={ranking}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rank: {
    flex: 1,
    fontSize: 18,
  },
  name: {
    flex: 3,
    fontSize: 18,
  },
  score: {
    flex: 1,
    fontSize: 18,
  },
});

export default RankingScreen;

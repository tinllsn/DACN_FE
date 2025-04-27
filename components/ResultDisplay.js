import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ResultDisplay({ image, result }) {
  return (
    <View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {result && <Text style={styles.result}>Image URL: {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
});

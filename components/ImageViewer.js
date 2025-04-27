import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ImageViewer = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default ImageViewer;

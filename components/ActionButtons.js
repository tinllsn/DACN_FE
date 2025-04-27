import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ActionButtons = ({ onPickImage, onTakePhoto }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPickImage}>
        <Text style={styles.buttonText}>📂 Pick from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
        <Text style={styles.buttonText}>📸 Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ActionButtons;

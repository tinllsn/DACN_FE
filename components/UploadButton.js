import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

const UploadButton = ({ image, loading, result, onUpload }) => {
  return (
    <View style={styles.container}>
      {image && !loading && (
        <TouchableOpacity style={styles.uploadBtn} onPress={onUpload}>
          <Text style={styles.btnText}>Upload & Classify</Text>
        </TouchableOpacity>
      )}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {result && (
        <Text style={styles.result}>Classification Result: {result}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  uploadBtn: {
    backgroundColor: '#FF3B30', // đỏ nổi bật
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default UploadButton;

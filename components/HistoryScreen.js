import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles, colors } from './styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        setUserData(parsedData);
        console.log('User data loaded:', parsedData);
        // Sau khi load userData thành công, fetch history
        fetchHistory(parsedData.id);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load user data');
    }
  };

  const fetchHistory = async (userId) => {
    try {
      setLoading(true);
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await fetch('https://3f81-113-160-235-47.ngrok-free.app/classifications/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        })
      });
      
      const data = await response.json();
      // console.log('History data:', data);
      setHistory(data);
      setError(null);
    } catch (err) {
      setError('Failed to load history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemHeader}>
        <View style={styles.classificationContainer}>
          <Text style={styles.itemType}>{item.wasteType.toUpperCase()}</Text>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
            <View style={styles.confidenceBar}>
              <View 
                style={[
                  styles.confidenceFill, 
                  { width: `${item.confidence * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
        <Text style={styles.suggestion}>{item.suggestion}</Text>
      </View>
      
      {item.image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
            style={styles.wasteImage}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadUserData()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={commonStyles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recycling History</Text>
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => `${item.userId}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recycling history yet</Text>
            <Text style={styles.emptySubText}>Start recycling to see your history here</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  listContainer: {
    padding: 15,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  classificationContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemType: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  confidenceText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 8,
    width: 40,
  },
  confidenceBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  suggestion: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  wasteImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default HistoryScreen; 
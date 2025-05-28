import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image, Switch, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const wasteTypes = [
  { 
    id: 'inorganic', 
    name: 'Inorganic', 
    color: '#e0f7fa', 
    borderColor: '#00acc1',
    image: require('../assets/plastic-icon.png')
  },
  { 
    id: 'organic', 
    name: 'Organic', 
    color: '#fff3e0', 
    borderColor: '#fb8c00',
    image: require('../assets/organic-icon.png')
  },
  { 
    id: 'recyclable', 
    name: 'Recyclable', 
    color: '#fce4ec', 
    borderColor: '#d81b60',
    image: require('../assets/recyable-icon.png')
  },
];

const DosDonts = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showDos, setShowDos] = useState(true);
  const [wasteGuides, setWasteGuides] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const navigateAccountScreen = () => {
    navigation.navigate('AccountScreen');
  };

  const navigateToGuide = () => {
    navigation.navigate('QuickGuide');
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (selectedType) {
      fetchGuide(selectedType);
    }
  }, [selectedType]);

  const fetchGuide = async (type) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://e146-171-225-184-205.ngrok-free.app/guide/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch guide');
      }
      
      const data = await response.json();
      // Phân loại dữ liệu dựa vào trường allowed (boolean)
      const dos = data.filter(item => item.allowed === true).map(item => item.content);
      const donts = data.filter(item => item.allowed === false).map(item => item.content);
      
      setWasteGuides(prev => ({
        ...prev,
        [type]: {
          dos: dos,
          donts: donts
        }
      }));
    } catch (err) {
      console.error('Error fetching guide:', err);
      setError('Failed to load guide. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderWasteTypeSelection = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Waste Type</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {wasteTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.typeButton, { backgroundColor: type.color, borderColor: type.borderColor }]}
            onPress={() => setSelectedType(type.id)}
          >
            <Image source={type.image} style={styles.typeIcon} />
            <Text style={[styles.typeText, { color: type.borderColor }]}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderGuide = () => {
    const guide = wasteGuides[selectedType];
    const type = wasteTypes.find(t => t.id === selectedType);
    const backgroundColor = showDos ? '#a4d65e' : '#e88a8a';

    if (loading) {
      return (
        <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedType(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{type.name} Guide</Text>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#16a34a" />
            <Text style={styles.loadingText}>Loading guide...</Text>
          </View>
          
        </View>
        
      );
    }

    if (error) {
      return (
        <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedType(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{type.name} Guide</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => fetchGuide(selectedType)}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    if (!guide || !guide.dos || !guide.donts) {
      return (
        <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedType(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{type.name} Guide</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Không tìm thấy hướng dẫn cho loại rác này</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => fetchGuide(selectedType)}
            >
              <Text style={styles.retryButtonText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedType(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{type.name} Guide</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image source={type.image} style={styles.materialImage} />
          </View>

          <View style={styles.whiteContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{type.name}</Text>
              <View style={styles.toggleContainer}>
                <Text style={[styles.toggleLabel, !showDos && styles.activeToggleLabel]}>Don'ts</Text>
                <Switch
                  trackColor={{ false: '#e88a8a', true: '#a4d65e' }}
                  thumbColor={'#ffffff'}
                  ios_backgroundColor="#e88a8a"
                  onValueChange={() => setShowDos(!showDos)}
                  value={showDos}
                  style={styles.toggle}
                />
                <Text style={[styles.toggleLabel, showDos && styles.activeToggleLabel]}>Dos</Text>
              </View>
            </View>

            <View style={styles.guidelinesList}>
              {(showDos ? guide.dos : guide.donts).map((item, index) => (
                <View key={index} style={styles.guidelineItem}>
                  <View style={[styles.iconContainer, { backgroundColor: showDos ? '#f0fff0' : '#fff0f0' }]}>
                    <Text style={[styles.icon, { color: showDos ? 'green' : 'red' }]}>
                      {showDos ? '♻' : '✕'}
                    </Text>
                  </View>
                  <Text style={styles.guidelineText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        
      </View>
      
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedType ? renderGuide() : renderWasteTypeSelection()}
      {/* Bottom Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHomeScreen}>
          <Image
            source={require('../assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToGuide}>
          <Image
            source={require('../assets/quick-guide-icon.png')}
            style={styles.navIcon}

          />
          <Text style={styles.navText}>Quick Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateAccountScreen}>
          <Image
            source={require('../assets/account-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2ecc71',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  typeIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  typeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  materialImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  whiteContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 5,
  },
  toggle: {
    marginHorizontal: 5,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#777',
    marginHorizontal: 5,
  },
  activeToggleLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  guidelinesList: {
    marginTop: 20,
    paddingBottom: 20,
  },
  
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',   // căn giữa theo chiều dọc
    justifyContent: 'center',  // căn giữa theo chiều ngang
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 3,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  guidelineText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
  },
  navText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default DosDonts; 
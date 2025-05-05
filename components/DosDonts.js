import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const wasteTypes = [
  { id: 'plastic', name: 'Plastic', color: '#e0f7fa', borderColor: '#00acc1' },
  { id: 'paper', name: 'Paper', color: '#fff3e0', borderColor: '#fb8c00' },
  { id: 'glass', name: 'Glass', color: '#fce4ec', borderColor: '#d81b60' },
  { id: 'metal', name: 'Metal', color: '#e8f5e9', borderColor: '#43a047' },
  { id: 'organic', name: 'Organic', color: '#e3f2fd', borderColor: '#1e88e5' },
];

const wasteGuides = {
  plastic: {
    dos: [
      'Rinse containers before recycling',
      'Remove caps and lids',
      'Check for recycling symbols',
      'Flatten bottles to save space',
      'Separate different types of plastic'
    ],
    donts: [
      'Don\'t recycle plastic bags',
      'Don\'t recycle food-contaminated plastic',
      'Don\'t recycle mixed materials',
      'Don\'t recycle plastic with food residue',
      'Don\'t recycle plastic that\'s too small'
    ]
  },
  paper: {
    dos: [
      'Remove any plastic or metal parts',
      'Keep paper dry and clean',
      'Flatten cardboard boxes',
      'Separate different types of paper',
      'Check for recycling symbols'
    ],
    donts: [
      'Don\'t recycle paper with food stains',
      'Don\'t recycle paper with wax coating',
      'Don\'t recycle paper with plastic coating',
      'Don\'t recycle paper with metal staples',
      'Don\'t recycle paper with adhesive'
    ]
  },
  glass: {
    dos: [
      'Rinse containers thoroughly',
      'Remove caps and lids',
      'Separate by color if required',
      'Check for recycling symbols',
      'Keep glass clean and dry'
    ],
    donts: [
      'Don\'t recycle broken glass',
      'Don\'t recycle glass with food residue',
      'Don\'t recycle mixed materials',
      'Don\'t recycle heat-resistant glass',
      'Don\'t recycle glass with metal parts'
    ]
  },
  metal: {
    dos: [
      'Rinse containers thoroughly',
      'Remove labels if possible',
      'Flatten cans to save space',
      'Separate different types of metal',
      'Check for recycling symbols'
    ],
    donts: [
      'Don\'t recycle metal with food residue',
      'Don\'t recycle mixed materials',
      'Don\'t recycle metal with plastic coating',
      'Don\'t recycle metal with paint',
      'Don\'t recycle metal with rust'
    ]
  },
  organic: {
    dos: [
      'Separate food scraps properly',
      'Use compostable bags',
      'Keep organic waste dry',
      'Mix with dry materials',
      'Check local composting guidelines'
    ],
    donts: [
      'Don\'t include meat or dairy',
      'Don\'t include pet waste',
      'Don\'t include plastic or metal',
      'Don\'t include treated wood',
      'Don\'t include diseased plants'
    ]
  }
};

const DosDonts = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation();

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
            <Text style={[styles.typeText, { color: type.borderColor }]}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderGuide = () => {
    const guide = wasteGuides[selectedType];
    const type = wasteTypes.find(t => t.id === selectedType);

    return (
      <View style={styles.container}>
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
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: type.borderColor }]}>Do's</Text>
            {guide.dos.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: type.borderColor }]}>Don'ts</Text>
            {guide.donts.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedType ? renderGuide() : renderWasteTypeSelection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#32CD32',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#32CD32',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  typeButton: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  typeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 20,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: '#666',
  },
  listText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 24,
  },
});

export default DosDonts; 
"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image } from "react-native"
import { Feather, MaterialCommunityIcons, Ionicons, AntDesign } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

export default function QuickGuide() {

  const navigation = useNavigation();
  
  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };

  const navigateToAccount = () => {
    navigation.navigate('AccountScreen');
  };
  const [currentTab, setCurrentTab] = useState("welcome")

  const tabs = ["welcome", "image-sorting", "dos-donts"]

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1])
    }
  }

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(currentTab)
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1])
    }
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case "welcome":
        return (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Welcome to EcoSort!</Text>
              <Text style={styles.cardDescription}>Your companion for proper waste sorting</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="leaf" size={64} color="#16a34a" />
              </View>
              <Text style={styles.paragraph}>
                EcoSort helps you sort waste correctly and contribute to environmental protection.
              </Text>
              <Text style={styles.subheading}>Main features:</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Identify waste through camera or gallery images</Text>
                <Text style={styles.listItem}>• Get sorting recommendations instantly</Text>
                {/* <Text style={styles.listItem}>• Stay updated with environmental news</Text> */}
                <Text style={styles.listItem}>• Learn proper waste management practices</Text>
              </View>
            </View>
          </View>
        )
      case "image-sorting":
        return (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Image Sorting</Text>
              <Text style={styles.cardDescription}>Identify and sort waste using your camera</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.featureGrid}>
                <View style={styles.featureItem}>
                  <Feather name="camera" size={40} color="#16a34a" />
                  <Text style={styles.featureTitle}>Camera</Text>
                  <Text style={styles.featureDescription}>Take a photo of waste to identify</Text>
                </View>
                <View style={styles.featureItem}>
                  <Feather name="image" size={40} color="#16a34a" />
                  <Text style={styles.featureTitle}>Gallery</Text>
                  <Text style={styles.featureDescription}>Select an image from your library</Text>
                </View>
              </View>
              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>For best results:</Text>
                <Text style={styles.tipItem}>• Ensure good lighting</Text>
                <Text style={styles.tipItem}>• Center the item in frame</Text>
                <Text style={styles.tipItem}>• Capture one item at a time</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  After capturing or selecting an image, EcoSort will analyze and suggest the proper waste category.
                </Text>
              </View>
            </View>
          </View>
        )
      // case "news":
      //   return (
      //     <View style={styles.card}>
      //       <View style={styles.cardHeader}>
      //         <Text style={styles.cardTitle}>News & Tips</Text>
      //         <Text style={styles.cardDescription}>Stay informed about environmental topics</Text>
      //       </View>
      //       <View style={styles.cardContent}>
      //         <View style={styles.iconContainer}>
      //           <Feather name="file-text" size={48} color="#16a34a" />
      //         </View>
      //         <Text style={styles.paragraph}>The News section provides:</Text>
      //         <View style={styles.list}>
      //           <Text style={styles.listItem}>• Latest environmental news and updates</Text>
      //           <Text style={styles.listItem}>• Detailed guides on waste sorting</Text>
      //           <Text style={styles.listItem}>• Tips for reducing your environmental footprint</Text>
      //           <Text style={styles.listItem}>• Success stories and community initiatives</Text>
      //         </View>
      //         <View style={styles.tipBox}>
      //           <Text style={styles.infoText}>
      //             Check back regularly for new content and seasonal waste management tips!
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   )
      case "dos-donts":
        return (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Dos & Don'ts</Text>
              <Text style={styles.cardDescription}>Best practices for waste management</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.dosAndDontsContainer}>
                <View style={styles.dosContainer}>
                  <View style={styles.dosHeader}>
                    <AntDesign name="checkcircle" size={20} color="#16a34a" />
                    <Text style={styles.dosTitle}>Dos</Text>
                  </View>
                  <View style={styles.dosList}>
                    <Text style={styles.dosItem}>✓ Rinse containers before recycling</Text>
                    <Text style={styles.dosItem}>✓ Separate different materials</Text>
                    <Text style={styles.dosItem}>✓ Flatten cardboard boxes</Text>
                    <Text style={styles.dosItem}>✓ Remove caps from bottles</Text>
                    <Text style={styles.dosItem}>✓ Compost food waste when possible</Text>
                  </View>
                </View>
                <View style={styles.dontsContainer}>
                  <View style={styles.dontsHeader}>
                    <AntDesign name="closecircle" size={20} color="#ef4444" />
                    <Text style={styles.dontsTitle}>Don'ts</Text>
                  </View>
                  <View style={styles.dontsList}>
                    <Text style={styles.dontsItem}>✗ Mix recyclables with trash</Text>
                    <Text style={styles.dontsItem}>✗ Recycle greasy paper</Text>
                    <Text style={styles.dontsItem}>✗ Put plastic bags in recycling</Text>
                    <Text style={styles.dontsItem}>✗ Dispose of batteries in trash</Text>
                    <Text style={styles.dontsItem}>✗ Recycle broken glass</Text>
                  </View>
                </View>
              </View>
              {/* <Text style={[styles.paragraph, { marginTop: 16, fontSize: 14 }]}>
                For detailed guidelines on specific items, use the image sorting feature or check the News section.
              </Text> */}
            </View>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#16a34a" barStyle="light-content" /> */}

      <View style={styles.header}>
        <MaterialCommunityIcons name="leaf" size={24} color="white" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>EcoSort Quick Guide</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, currentTab === "welcome" && styles.activeTab]}
            onPress={() => setCurrentTab("welcome")}
          >
            <Text style={[styles.tabText, currentTab === "welcome" && styles.activeTabText]}>Welcome</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, currentTab === "image-sorting" && styles.activeTab]}
            onPress={() => setCurrentTab("image-sorting")}
          >
            <Text style={[styles.tabText, currentTab === "image-sorting" && styles.activeTabText]}>Sorting</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.tab, currentTab === "news" && styles.activeTab]}
            onPress={() => setCurrentTab("news")}
          >
            <Text style={[styles.tabText, currentTab === "news" && styles.activeTabText]}>News</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.tab, currentTab === "dos-donts" && styles.activeTab]}
            onPress={() => setCurrentTab("dos-donts")}
          >
            <Text style={[styles.tabText, currentTab === "dos-donts" && styles.activeTabText]}>Dos & Don'ts</Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentTab === "welcome" && styles.disabledButton]}
            onPress={goToPreviousTab}
            disabled={currentTab === "welcome"}
          >
            <Ionicons name="chevron-back" size={16} color={currentTab === "welcome" ? "#9ca3af" : "#16a34a"} />
            <Text style={[styles.navButtonText, currentTab === "welcome" && styles.disabledButtonText]}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, currentTab === "dos-donts" && styles.disabledButton]}
            onPress={goToNextTab}
            disabled={currentTab === "dos-donts"}
          >
            <Text
              style={[
                styles.navButtonText,
                styles.nextButtonText,
                currentTab === "dos-donts" && styles.disabledButtonText,
              ]}
            >
              Next
            </Text>
            <Ionicons name="chevron-forward" size={16} color={currentTab === "dos-donts" ? "#9ca3af" : "white"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem} onPress={navigateToHomeScreen}>
          <Image
            source={require('../assets/home-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} >
          <Image
            source={require('../assets/quick-guide-icon.png')} 
            style={styles.navIcon}
            
          />
          <Text style={styles.navText}>Quick Guide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={navigateToAccount}>
          <Image
            source={require('../assets/account-icon.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>EcoSort - Making waste sorting simple</Text>
      </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
  },
  header: {
    backgroundColor: "#16a34a",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#16a34a",
  },
  tabText: {
    fontSize: 12,
    color: "#16a34a",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#15803d",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  cardContent: {
    padding: 16,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 4,
  },
  featureGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  featureItem: {
    flex: 1,
    backgroundColor: "#dcfce7",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: "#374151",
  },
  featureDescription: {
    fontSize: 12,
    textAlign: "center",
    color: "#4b5563",
  },
  tipBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
    backgroundColor: "#f0fdf4",
    padding: 12,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#374151",
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
  },
  infoBox: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
    color: "#4b5563",
  },
  dosAndDontsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dosContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 8,
    marginRight: 4,
  },
  dontsContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    marginLeft: 4,
  },
  dosHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#bbf7d0",
  },
  dontsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fecaca",
  },
  dosTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#15803d",
  },
  dontsTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#b91c1c",
  },
  dosList: {
    padding: 8,
  },
  dontsList: {
    padding: 8,
  },
  dosItem: {
    fontSize: 12,
    lineHeight: 20,
    color: "#374151",
  },
  dontsItem: {
    fontSize: 12,
    lineHeight: 20,
    color: "#374151",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
  },
  nextButton: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#16a34a",
    marginHorizontal: 4,
  },
  nextButtonText: {
    color: "white",
  },
  disabledButton: {
    borderColor: "#d1d5db",
    backgroundColor: "#f3f4f6",
  },
  disabledButtonText: {
    color: "#9ca3af",
  },
  footer: {
    backgroundColor: "#16a34a",
    padding: 12,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
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
    tintColor: '#555',
  },
  navText: {
    fontSize: 12,
    color: '#555',
  },
})

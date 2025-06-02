// HomeScreen.tsx - Fixed version
"use client"

import { useState } from "react"
import { StyleSheet, View, FlatList, Modal, SafeAreaView, TextInput, Text, TouchableOpacity, Platform, StatusBar } from "react-native"
import { teamMembers } from "../data/team-data"
import { TeamMemberCard } from "../components/TeamMemberCard"
import { MemberDetailsModal } from "../components/MemberDetailsModal"
import { Header } from "../components/Header"
import type { TeamMember } from "../types/TeamMember"
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const colors = {
    dark: {
      background: '#1a1a1a',
      cardBackground: '#2a2a2a',
      textPrimary: '#fff',
      textSecondary: '#999',
      inputTextBackground: '#333',
      inputText: '#fff',
      placeholderText: '#999',
      modalOverlay: 'rgba(0, 0, 0, 0.7)', // Increased opacity
      modalBackground: '#2a2a2a',
    },
    light: {
      background: '#fff',
      cardBackground: '#f0f0f0',
      textPrimary: '#333',
      textSecondary: '#666',
      inputTextBackground: '#eee',
      inputText: '#000',
      placeholderText: '#666',
      modalOverlay: 'rgba(0, 0, 0, 0.5)', // Increased opacity
      modalBackground: '#fff',
    },
  };

  const currentColors = colors[theme];

  const horizontalPadding = width * 0.05;
  const searchMarginHorizontal = width * 0.05;

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMemberDetails = (member: TeamMember) => {
    console.log('Opening modal for:', member.name); // Debug log
    setSelectedMember(member)
    setModalVisible(true)
  }

  const closeMemberDetails = () => {
    console.log('Closing modal'); // Debug log
    setModalVisible(false)
    setSelectedMember(null)
  }

  const renderTeamMember = ({ item }: { item: TeamMember }) => (
    <TeamMemberCard member={item} onPress={() => openMemberDetails(item)} />
  )

  return (
    <SafeAreaView style={[styles.container, { 
      backgroundColor: currentColors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }]}>
      <Header />

      <TextInput
        style={[
          styles.searchInput,
          isSearchFocused && styles.searchInputFocused,
          { marginHorizontal: searchMarginHorizontal },
          {
            backgroundColor: currentColors.inputTextBackground,
            color: currentColors.inputText,
          },
        ]}
        placeholder="Search team members..."
        placeholderTextColor={currentColors.placeholderText}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
      />

      {filteredTeamMembers.length > 0 ? (
        <FlatList
          data={filteredTeamMembers}
          renderItem={renderTeamMember}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.listContainer, { paddingHorizontal: horizontalPadding, paddingTop: 10 }]}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={[styles.emptyStateText, { color: currentColors.textSecondary }]}>
            No team members found.
          </Text>
        </View>
      )}

      {/* Fixed Modal Structure */}
      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={closeMemberDetails}
        statusBarTranslucent={true} // Add this for better Android support
      >
        <View style={[styles.modalOverlay, { backgroundColor: currentColors.modalOverlay }]}>
          {/* Add touchable overlay to close modal when tapping outside */}
          <TouchableOpacity 
            style={styles.modalOverlayTouchable} 
            activeOpacity={1} 
            onPress={closeMemberDetails}
          >
            <TouchableOpacity 
              style={[styles.modalContent, { backgroundColor: currentColors.modalBackground }]}
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()} // Prevent closing when touching modal content
            >
              {selectedMember && (
                <MemberDetailsModal 
                  member={selectedMember} 
                  onClose={closeMemberDetails} 
                />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlayTouchable: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    minHeight: "60%", // Increased minimum height for better content display
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flex: 1, // Allow proper flex behavior for scrolling
  },
  searchInput: {
    padding: 12,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  searchInputFocused: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    textAlign: 'center',
  },
})
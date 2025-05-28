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
      modalOverlay: 'rgba(0, 0, 0, 0.5)',
    },
    light: {
      background: '#fff',
      cardBackground: '#f0f0f0',
      textPrimary: '#333',
      textSecondary: '#666',
      inputTextBackground: '#eee',
      inputText: '#000',
      placeholderText: '#666',
      modalOverlay: 'rgba(0, 0, 0, 0.3)',
    },
  };

  const currentColors = colors[theme];

  const horizontalPadding = width * 0.05;
  const searchMarginHorizontal = width * 0.05;

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    // Add more fields to search if needed, e.g., member.skills.join(', ').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State to hold team members fetched from the API
  // const [teamData, setTeamData] = useState<TeamMember[]>([]);

  // Example of fetching data from a mock endpoint using useEffect
  /*
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Replace with your mock endpoint URL
        const response = await fetch('https://my-mock-api.com/team');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TeamMember[] = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
        // Handle error appropriately, e.g., set an error state
      }
    };

    fetchTeamData();

    // Optional: return a cleanup function if needed
    // return () => { /* cleanup */ /* };
  }, []); // Empty dependency array means this effect runs once on mount
  */

  const openMemberDetails = (member: TeamMember) => {
    setSelectedMember(member)
    setModalVisible(true)
  }

  const closeMemberDetails = () => {
    setModalVisible(false)
    setSelectedMember(null)
  }

  const renderTeamMember = ({ item }: { item: TeamMember }) => (
    <TeamMemberCard member={item} onPress={() => openMemberDetails(item)} />
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentColors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }]}>
      <Header />

      {/* Search Input */}
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

      {/* Conditional rendering based on search results */}
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
          <Text style={styles.emptyStateText}>No team members found.</Text>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeMemberDetails}>
        <View style={[styles.modalOverlay, { backgroundColor: currentColors.modalOverlay, flex: 1 }]}>
          <View style={[styles.modalContent, { backgroundColor: currentColors.cardBackground }]}>
            {selectedMember && <MemberDetailsModal member={selectedMember} onClose={closeMemberDetails} />}
          </View>
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
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
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
  emptyStateContainer: { // Style for the empty state container
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: { // Style for the empty state text
    color: '#999',
    fontSize: 18,
    textAlign: 'center',
  },
})

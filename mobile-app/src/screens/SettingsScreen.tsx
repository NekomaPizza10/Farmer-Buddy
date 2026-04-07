import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, Switch,
  ScrollView, Image, Dimensions, Platform, Modal, TextInput, KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { useAppContext } from '../context/AppContext';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SettingsScreen() {
  const { profile, signOut } = useAuth();
  const { language, setLanguage, theme, setTheme, themeColors, t } = useAppContext();
  const navigation = useNavigation();

  // --- State for Modals ---
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  // Form State
  const [editName, setEditName] = useState(profile?.name || '');
  const [editEmail, setEditEmail] = useState(profile?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: signOut },
    ]);
  };

  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      {/* 1. Background Header */}
      <View style={styles.greenBackground}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />

        <SafeAreaView edges={['top']}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#1f291e" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* 2. Overlapping Avatar Wrapper */}
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('assets/image/Profile.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* 3. Main Content Card */}
      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.profileInfoText}>
            <Text style={styles.userName}>{profile?.name || 'User Name'}</Text>
            <Text style={styles.userEmail}>{profile?.email || 'username@gmail.com'}</Text>
          </View>

          <Text style={styles.sectionLabel}>General</Text>

          {/* Profile Settings */}
          <TouchableOpacity style={styles.menuRow} onPress={() => setEditModalVisible(true)}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="account-edit-outline" size={22} color="#2d4b2a" />
              <Text style={styles.menuText}>Profile Settings</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          {/* Language Pop-out */}
          <TouchableOpacity style={styles.menuRow} onPress={() => setLanguageModalVisible(true)}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="translate" size={22} color="#2d4b2a" />
              <Text style={styles.menuText}>Language ({language === 'en' ? 'English' : 'Bahasa'})</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          {/* Theme Section - Alignment Fixed */}
          <View style={[styles.menuRow, { paddingVertical: 0 }]}>
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name={isDark ? "weather-night" : "weather-sunny"} size={22} color="#2d4b2a" />
              <Text style={styles.menuText}>Theme ({isDark ? 'Dark' : 'Light'})</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={isDark}
                onValueChange={(val) => setTheme(val ? 'dark' : 'light')}
                trackColor={{ false: '#ddd', true: '#22c55e' }}
                thumbColor={'#fff'}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>SmartAgro v1.0.0</Text>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      {/* --- MODAL: Language Selection --- */}
      <Modal visible={isLanguageModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.selectionModal}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity
              style={[styles.selectionItem, language === 'en' && styles.selectionActive]}
              onPress={() => { setLanguage('en'); setLanguageModalVisible(false); }}
            >
              <Text style={[styles.selectionText, language === 'en' && styles.selectionTextActive]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectionItem, language === 'ms' && styles.selectionActive]}
              onPress={() => { setLanguage('ms'); setLanguageModalVisible(false); }}
            >
              <Text style={[styles.selectionText, language === 'ms' && styles.selectionTextActive]}>Bahasa Melayu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setLanguageModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- MODAL: Profile Editing (Includes Passwords) --- */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.editProfileModal}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Edit Profile</Text>

              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
              />

              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />

              <View style={styles.passwordSection}>
                <Text style={styles.sectionLabelSmall}>Change Password</Text>

                <Text style={styles.inputLabel}>New Password</Text>
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Type new password"
                  secureTextEntry
                />

                <Text style={styles.inputLabel}>Retype New Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Retype new password"
                  secureTextEntry
                />
              </View>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={() => setEditModalVisible(false)}>
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  greenBackground: {
    height: SCREEN_HEIGHT * 0.32,
    backgroundColor: '#a8e6cf',
    overflow: 'hidden',
  },
  circle: { position: 'absolute', borderRadius: 200, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  circle1: { width: 300, height: 300, top: -50, right: -100 },
  circle2: { width: 250, height: 250, bottom: -50, left: -100 },
  backButton: { padding: 20 },

  avatarWrapper: {
    position: 'absolute',
    top: (SCREEN_HEIGHT * 0.32) - 56,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#fff',
    padding: 4,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 8 }
    }),
  },
  avatar: { width: '100%', height: '100%', borderRadius: 56 },

  mainCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
  },
  scrollContent: { paddingTop: 65 },
  profileInfoText: { alignItems: 'center', marginBottom: 30 },
  userName: { fontSize: 22, fontWeight: '700', color: '#1f291e', fontFamily: 'Sansation' },
  userEmail: { fontSize: 14, color: 'rgba(31, 41, 30, 0.6)', fontFamily: 'Sansation', marginTop: 4 },

  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#2d4b2a', marginBottom: 15, fontFamily: 'Sansation' },
  menuRow: {
    backgroundColor: '#fff',
    height: 58,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center', // Fixes vertical alignment
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
  },
  switchContainer: {
    height: '100%',
    justifyContent: 'center', // Fixes theme toggle centering
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { fontSize: 15, color: '#1f291e', fontFamily: 'Sansation', marginLeft: 12, fontWeight: '500' },

  signOutButton: {
    marginTop: 30,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#ff8989',
    backgroundColor: 'rgba(255, 137, 137, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: { color: '#ef4444', fontSize: 18, fontWeight: '700', fontFamily: 'Sansation' },
  footerText: { textAlign: 'center', color: '#ccc', fontSize: 12, marginTop: 40 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  selectionModal: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1f291e', marginBottom: 20, textAlign: 'center' },
  selectionItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', alignItems: 'center' },
  selectionActive: { backgroundColor: '#f0faf5' },
  selectionText: { fontSize: 16, color: '#444' },
  selectionTextActive: { color: '#22c55e', fontWeight: '700' },
  modalCloseBtn: { marginTop: 15, paddingVertical: 10 },
  modalCloseText: { textAlign: 'center', color: '#888', fontWeight: '600' },

  editProfileModal: { width: '90%', backgroundColor: '#fff', borderRadius: 25, padding: 25, maxHeight: '90%' },
  inputLabel: { fontSize: 13, color: '#666', marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 15, fontSize: 15 },
  passwordSection: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', marginBottom: 10 },
  sectionLabelSmall: { fontSize: 14, fontWeight: '700', color: '#2d4b2a', marginBottom: 15 },
  modalButtonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10 },
  cancelBtn: { flex: 1, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#f5f5f5' },
  saveBtn: { flex: 1, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 12, backgroundColor: '#2d4b2a' },
  cancelBtnText: { color: '#666', fontWeight: '700' },
  saveBtnText: { color: '#fff', fontWeight: '700' }
});
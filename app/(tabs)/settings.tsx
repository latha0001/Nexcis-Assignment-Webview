import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Moon, Globe, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, User, Palette, Lock } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import Animated, { FadeInRight } from 'react-native-reanimated';

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onPress?: () => void;
  delay?: number;
};

function SettingItem({ 
  icon, 
  title, 
  description, 
  action, 
  onPress,
  delay = 0
}: SettingItemProps) {
  const { colors } = useTheme();
  
  return (
    <Animated.View entering={FadeInRight.delay(delay).springify()}>
      <TouchableOpacity 
        style={[styles.settingItem, { backgroundColor: colors.cardBackground }]} 
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={[styles.settingIconContainer, { backgroundColor: `${colors.primary}15` }]}>
          {icon}
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {description && (
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              {description}
            </Text>
          )}
        </View>
        {action || (
          <ChevronRight size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function SettingsScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Logout logic would go here
            Alert.alert('Logged out successfully');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="auto" />
      
      <Header title="Settings" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        
        <SettingItem
          icon={<User size={20} color={colors.primary} />}
          title="Personal Information"
          description="Update your personal details"
          onPress={() => {}}
          delay={100}
        />
        
        <SettingItem
          icon={<Lock size={20} color={colors.primary} />}
          title="Security"
          description="Manage password and security options"
          onPress={() => {}}
          delay={150}
        />
        
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 32 }]}>Preferences</Text>
        
        <SettingItem
          icon={<Bell size={20} color={colors.primary} />}
          title="Notifications"
          description={notificationsEnabled ? "Enabled" : "Disabled"}
          action={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E5EA', true: `${colors.primary}80` }}
              thumbColor={notificationsEnabled ? colors.primary : '#FFFFFF'}
              ios_backgroundColor="#E5E5EA"
            />
          }
          delay={200}
        />
        
        <SettingItem
          icon={<Moon size={20} color={colors.primary} />}
          title="Dark Mode"
          description={isDark ? "Enabled" : "Disabled"}
          action={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#E5E5EA', true: `${colors.primary}80` }}
              thumbColor={isDark ? colors.primary : '#FFFFFF'}
              ios_backgroundColor="#E5E5EA"
            />
          }
          delay={250}
        />
        
        <SettingItem
          icon={<Palette size={20} color={colors.primary} />}
          title="Appearance"
          description="Customize app appearance"
          onPress={() => {}}
          delay={300}
        />
        
        <SettingItem
          icon={<Globe size={20} color={colors.primary} />}
          title="Language"
          description="English (US)"
          onPress={() => {}}
          delay={350}
        />
        
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 32 }]}>Support</Text>
        
        <SettingItem
          icon={<HelpCircle size={20} color={colors.primary} />}
          title="Help Center"
          description="Get help with the app"
          onPress={() => {}}
          delay={400}
        />
        
        <SettingItem
          icon={<Shield size={20} color={colors.primary} />}
          title="Privacy Policy"
          onPress={() => {}}
          delay={450}
        />
        
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: colors.error }]}
            onPress={handleLogout}
          >
            <LogOut size={18} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.versionText, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  logoutContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.6,
  },
});
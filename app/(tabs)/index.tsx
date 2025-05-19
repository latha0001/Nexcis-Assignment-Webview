import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { FeaturedCard } from '@/components/FeaturedCard';
import { RecentActivityCard } from '@/components/RecentActivityCard';

export default function HomeScreen() {
  const { colors } = useTheme();
  
  const recentActivities = [
    { 
      id: '1', 
      title: 'Morning Workout', 
      description: 'Completed 30 minutes cardio session',
      timestamp: '2 hours ago',
      icon: '🏃‍♂️'
    },
    { 
      id: '2', 
      title: 'Project Milestone', 
      description: 'Reached 75% completion on your main project',
      timestamp: '5 hours ago',
      icon: '🎯'
    },
    { 
      id: '3', 
      title: 'Reading Goal', 
      description: 'Read 15 pages of "Atomic Habits"',
      timestamp: 'Yesterday',
      icon: '📚'
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="auto" />
      
      <Header
        title="Home"
        rightContent={
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={22} color={colors.text} />
            </TouchableOpacity>
          </View>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: colors.text }]}>Good morning,</Text>
          <Text style={[styles.userName, { color: colors.text }]}>Alex</Text>
        </View>
        
        <View style={styles.featuredSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredCardsContainer}
          >
            <FeaturedCard
              title="Daily Workout"
              description="30 min full body routine"
              image="https://images.pexels.com/photos/6456150/pexels-photo-6456150.jpeg?auto=compress&cs=tinysrgb&w=800"
              backgroundColor="#E0F2FE"
              onPress={() => {}}
            />
            <FeaturedCard
              title="Meditation"
              description="15 min mindfulness session"
              image="https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=800"
              backgroundColor="#FCE7F3"
              onPress={() => {}}
            />
            <FeaturedCard
              title="Reading List"
              description="5 books in your queue"
              image="https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=800"
              backgroundColor="#ECFDF5"
              onPress={() => {}}
            />
          </ScrollView>
        </View>
        
        <View style={styles.activitySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
          {recentActivities.map((activity) => (
            <RecentActivityCard 
              key={activity.id}
              title={activity.title}
              description={activity.description}
              timestamp={activity.timestamp}
              icon={activity.icon}
              onPress={() => {}}
            />
          ))}
        </View>
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
    paddingBottom: 32,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  greeting: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    opacity: 0.8,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginTop: 4,
  },
  featuredSection: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  featuredCardsContainer: {
    paddingRight: 16,
  },
  activitySection: {
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});
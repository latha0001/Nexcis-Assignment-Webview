import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit, Settings, Share2, Grid2x2 as Grid, List, Award, Bookmark } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const STATS = [
  { label: 'Posts', value: '24' },
  { label: 'Followers', value: '2.4k' },
  { label: 'Following', value: '128' },
];

const TABS = ['Activities', 'Bookmarks'];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Activities');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const screenWidth = Dimensions.get('window').width;
  const tabIndicatorPosition = useSharedValue(0);
  
  const switchTab = (tab: string) => {
    setActiveTab(tab);
    tabIndicatorPosition.value = withTiming(
      tab === TABS[0] ? 0 : screenWidth / 2 - 24,
      { duration: 250 }
    );
  };
  
  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabIndicatorPosition.value }],
    };
  });

  const activities = [
    {
      id: '1',
      title: 'Morning Run',
      date: 'Today',
      image: 'https://images.pexels.com/photos/5038819/pexels-photo-5038819.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 42,
    },
    {
      id: '2',
      title: 'Mountain Hiking',
      date: 'Yesterday',
      image: 'https://images.pexels.com/photos/17869895/pexels-photo-17869895/free-photo-of-hike-to-punta-imperatore-lighthouse-in-ischia-island.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 126,
    },
    {
      id: '3',
      title: 'Yoga Session',
      date: '2 days ago',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 93,
    },
    {
      id: '4',
      title: 'Beach Volleyball',
      date: 'Last week',
      image: 'https://images.pexels.com/photos/2444982/pexels-photo-2444982.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 74,
    },
  ];

  const bookmarks = [
    {
      id: '1',
      title: 'Strength Training Guide',
      author: 'Fitness Pro',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'Healthy Recipes Collection',
      author: 'Nutrition Hub',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'Meditation Techniques',
      author: 'Mindfulness Today',
      image: 'https://images.pexels.com/photos/775417/pexels-photo-775417.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const renderContent = () => {
    const data = activeTab === 'Activities' ? activities : bookmarks;
    
    if (viewMode === 'grid') {
      return (
        <View style={styles.gridContainer}>
          {data.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={styles.gridItem}
              entering={FadeIn.delay(index * 100)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.gridImage} 
                resizeMode="cover"
              />
            </Animated.View>
          ))}
        </View>
      );
    } else {
      return (
        <View style={styles.listContainer}>
          {data.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={[styles.listItem, { backgroundColor: colors.cardBackground }]}
              entering={FadeIn.delay(index * 100)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.listImage} 
                resizeMode="cover"
              />
              <View style={styles.listContent}>
                <Text style={[styles.listTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.listSubtitle, { color: colors.textSecondary }]}>
                  {activeTab === 'Activities' ? item.date : `By ${(item as any).author}`}
                </Text>
                {activeTab === 'Activities' && (
                  <View style={styles.listStats}>
                    <Text style={[styles.listStatsText, { color: colors.textSecondary }]}>
                      {(item as any).likes} likes
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          ))}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
            style={styles.profileImage} 
          />
          
          <Text style={[styles.profileName, { color: colors.text }]}>Alex Johnson</Text>
          <Text style={[styles.profileBio, { color: colors.textSecondary }]}>
            Fitness enthusiast, photography lover, and perpetual learner. Exploring the world one step at a time.
          </Text>
          
          <View style={styles.statsContainer}>
            {STATS.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              icon={<Edit size={16} color="#FFFFFF" />}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button
              title="Share"
              onPress={() => {}}
              icon={<Share2 size={16} color="#FFFFFF" />}
              variant="secondary"
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </View>
        
        <View style={styles.achievementsSection}>
          <View style={styles.achievementsHeader}>
            <Award size={16} color={colors.primary} />
            <Text style={[styles.achievementsTitle, { color: colors.text }]}>Achievements</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {['🏃‍♂️', '🧘‍♀️', '🏊‍♂️', '🚴‍♀️', '🏋️‍♂️'].map((emoji, index) => (
              <View 
                key={index} 
                style={[styles.achievementItem, { backgroundColor: `${colors.primary}15` }]}
              >
                <Text style={styles.achievementEmoji}>{emoji}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.contentSection}>
          <View style={styles.tabsContainer}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tabButton}
                onPress={() => switchTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { 
                      color: activeTab === tab ? colors.primary : colors.textSecondary,
                      fontFamily: activeTab === tab ? 'Inter-Medium' : 'Inter-Regular',
                    }
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && (
                  <Animated.View 
                    style={[
                      styles.tabIndicator,
                      { backgroundColor: colors.primary },
                      activeTab === tab && tabIndicatorStyle
                    ]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.viewModeContainer}>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === 'grid' && { backgroundColor: `${colors.primary}15` }
              ]}
              onPress={() => setViewMode('grid')}
            >
              <Grid 
                size={18} 
                color={viewMode === 'grid' ? colors.primary : colors.textSecondary} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === 'list' && { backgroundColor: `${colors.primary}15` }
              ]}
              onPress={() => setViewMode('list')}
            >
              <List 
                size={18} 
                color={viewMode === 'list' ? colors.primary : colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          
          {renderContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  profileBio: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  achievementsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementsTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  achievementsContainer: {
    paddingRight: 16,
  },
  achievementItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  contentSection: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    height: 3,
    width: 24,
    borderRadius: 1.5,
  },
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 4,
  },
  gridImage: {
    flex: 1,
    borderRadius: 8,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  listItem: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  listImage: {
    width: 80,
    height: 80,
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  listSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  listStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStatsText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterX, Search } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/Header';
import { DiscoverCard } from '@/components/DiscoverCard';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const CATEGORIES = ['All', 'Popular', 'Events', 'Wellness', 'Learning'];

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const discoverItems = [
    {
      id: '1',
      title: 'Morning Yoga',
      description: 'Start your day with energy and focus',
      image: 'https://images.pexels.com/photos/4793357/pexels-photo-4793357.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wellness',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Creative Writing Workshop',
      description: 'Express yourself through words and stories',
      image: 'https://images.pexels.com/photos/5698697/pexels-photo-5698697.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Learning',
      rating: 4.5,
    },
    {
      id: '3',
      title: 'Weekend Music Festival',
      description: 'Live performances from top artists',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Events',
      rating: 4.9,
    },
    {
      id: '4',
      title: 'Productivity Masterclass',
      description: 'Learn to optimize your workflow',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Learning',
      rating: 4.7,
    },
    {
      id: '5',
      title: 'Healthy Meal Planning',
      description: 'Simple nutrition tips for busy lifestyles',
      image: 'https://images.pexels.com/photos/6544087/pexels-photo-6544087.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wellness',
      rating: 4.6,
    },
  ];

  const filteredItems = discoverItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
                         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style="auto" />
      
      <Header title="Discover" />
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.cardBackground }]}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <FilterX size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                selectedCategory === category && 
                { backgroundColor: colors.primary }
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category ? '#FFFFFF' : colors.text }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(index * 100).springify()}
            >
              <DiscoverCard
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
                rating={item.rating}
                onPress={() => {}}
              />
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              No items found. Try adjusting your search.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    opacity: 0.7,
  },
});
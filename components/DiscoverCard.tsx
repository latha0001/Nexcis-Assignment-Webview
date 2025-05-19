import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Star } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

type DiscoverCardProps = {
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  onPress: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function DiscoverCard({
  title,
  description,
  image,
  category,
  rating,
  onPress,
}: DiscoverCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 10, stiffness: 400 });
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground },
        cardAnimatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={Platform.OS === 'ios' ? 0.9 : 1}
      android_ripple={{ color: colors.ripple }}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: `${colors.primary}15` }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>
              {category}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={12} color={colors.warning} fill={colors.warning} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
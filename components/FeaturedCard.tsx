import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

type FeaturedCardProps = {
  title: string;
  description: string;
  image: string;
  backgroundColor?: string;
  onPress: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function FeaturedCard({
  title,
  description,
  image,
  backgroundColor = '#E0F2FE',
  onPress,
}: FeaturedCardProps) {
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
        { backgroundColor },
        cardAnimatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={Platform.OS === 'ios' ? 0.9 : 1}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: '100%',
  },
});
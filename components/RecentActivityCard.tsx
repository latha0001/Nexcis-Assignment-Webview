import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

type RecentActivityCardProps = {
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  onPress: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function RecentActivityCard({
  title,
  description,
  timestamp,
  icon,
  onPress,
}: RecentActivityCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 10, stiffness: 400 });
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
      <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
            {timestamp}
          </Text>
        </View>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  timestamp: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
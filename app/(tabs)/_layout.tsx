import { Tabs } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Chrome as Home, Search, User, Settings } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabel: ({ focused, color }) => {
          let label = '';
          if (route.name === 'index') label = 'Home';
          else if (route.name === 'discover') label = 'Discover';
          else if (route.name === 'profile') label = 'Profile';
          else if (route.name === 'settings') label = 'Settings';

          return (
            <Animated.Text
              style={[
                styles.tabBarLabelText,
                {
                  color,
                  fontFamily: focused ? 'Inter-Medium' : 'Inter-Regular',
                  opacity: focused ? 1 : 0.8,
                  transform: [{ scale: focused ? 1 : 0.95 }],
                },
              ]}
            >
              {label}
            </Animated.Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'index') icon = <Home size={size} color={color} />;
          else if (route.name === 'discover') icon = <Search size={size} color={color} />;
          else if (route.name === 'profile') icon = <User size={size} color={color} />;
          else if (route.name === 'settings') icon = <Settings size={size} color={color} />;

          return (
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? `${color}15` : 'transparent',
                  transform: [{ scale: focused ? 1 : 0.85 }],
                },
              ]}
            >
              {icon}
            </Animated.View>
          );
        },
        tabBarButton: (props) => {
          return (
            <Pressable
              {...props}
              android_ripple={{ color: colors.ripple, borderless: true }}
              style={(state) => [
                props.style,
                state.pressed && Platform.OS === 'ios' && { opacity: 0.8 },
              ]}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabBarLabel: {
    marginTop: 0,
    fontSize: 12,
  },
  tabBarLabelText: {
    fontSize: 12,
    marginTop: 2,
  },
  tabBarIcon: {
    marginTop: 2,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
});
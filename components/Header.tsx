import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type HeaderProps = {
  title: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export function Header({ title, leftContent, rightContent }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.leftContent}>
        {leftContent}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.rightContent}>
        {rightContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftContent: {
    width: 40,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  rightContent: {
    width: 40,
    alignItems: 'flex-end',
  },
});
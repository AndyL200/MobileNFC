import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
// You can swap Ionicons for MaterialIcons, FontAwesome, etc.

type IconSymbolProps = {
  name: string;              // icon name from the chosen icon set
  size?: number;             // default size
  color: string;             // icon color
  style?: StyleProp<ViewStyle>;
  weight?: 'regular' | 'bold'; // optional, you can map this to different icon variants
};

export function Icon({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: IconSymbolProps) {
  // You can map weight to different icon names if your icon set supports it
  const iconName = weight === 'bold' ? `${name}-outline` : name;

  return (
    <Icon
      name={iconName}
      size={size}
      color={color}
      style={style}
    />
  );
}
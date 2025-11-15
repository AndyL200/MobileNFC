import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import HapticFeedback from 'react-native-haptic-feedback';


export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        HapticFeedback.trigger('impactLight'); // Trigger light impact feedback
        props.onPressIn?.(ev);
      }}
    />
  );
}

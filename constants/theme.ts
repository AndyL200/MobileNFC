/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#667eea';
const tintColorDark = '#fff';

// Consistent app theme
export const AppTheme = {
  colors: {
    primary: '#667eea',
    secondary: '#002244',
    background: '#f8f9fa',
    surface: '#fff',
    text: '#333',
    textSecondary: '#555',
    textLight: '#fff',
    border: '#ccc',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    shadow: 'rgba(0, 0, 0, 0.15)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  shadows: {
    light: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    heavy: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 10,
    },
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '700',
    },
    h2: {
      fontSize: 20,
      fontWeight: '600',
    },
    h3: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
    },
    small: {
      fontSize: 12,
      fontWeight: '400',
    },
  },
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Common styles that can be reused across components
export const CommonStyles = {
  container: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: AppTheme.colors.primary,
    padding: AppTheme.spacing.md,
  },
  formContainer: {
    backgroundColor: AppTheme.colors.surface,
    padding: AppTheme.spacing.lg,
    borderRadius: AppTheme.borderRadius.lg,
    width: '100%',
    maxWidth: 360,
    ...AppTheme.shadows.medium,
  },
  heading: {
    marginBottom: AppTheme.spacing.lg,
    textAlign: 'center' as const,
    color: AppTheme.colors.text,
    ...AppTheme.typography.h2,
  },
  formGroup: {
    marginBottom: AppTheme.spacing.md,
  },
  label: {
    marginBottom: AppTheme.spacing.sm,
    color: AppTheme.colors.textSecondary,
    ...AppTheme.typography.caption,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: AppTheme.spacing.md,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.borderRadius.md,
    ...AppTheme.typography.body,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: AppTheme.colors.primary,
    borderRadius: AppTheme.borderRadius.md,
    alignItems: 'center' as const,
    marginTop: AppTheme.spacing.sm,
  },
  primaryButtonText: {
    color: AppTheme.colors.textLight,
    ...AppTheme.typography.body,
    fontWeight: '600',
  },
  errorText: {
    color: AppTheme.colors.error,
    ...AppTheme.typography.body,
  },
};

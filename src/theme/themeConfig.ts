// src/theme/themeConfig.ts

export type ThemeMode = 'light' | 'dark';

export const themeColors = {
    // Primary Colors
    primary: {
        light: '#2563eb', // Blue
        dark: '#65a30d',  // Lime Green
    },
    primaryHover: {
        light: '#1d4ed8',
        dark: '#5ce600',
    },

    // Background Colors
    background: {
        light: '#ffffff',
        dark: '#0f172a',
    },
    backgroundSecondary: {
        light: '#f8fafc',
        dark: '#050811',
    },

    // Card Colors
    card: {
        light: '#ffffff',
        dark: '#0a0f1d',
    },
    cardHover: {
        light: '#f1f5f9',
        dark: '#1a1f2e',
    },

    // Text Colors
    text: {
        light: '#0f172a',
        dark: '#ffffff',
    },
    textSecondary: {
        light: '#64748b',
        dark: '#9ca3af',
    },
    textMuted: {
        light: '#94a3b8',
        dark: '#6b7280',
    },

    // Border Colors
    border: {
        light: '#e5e7eb',
        dark: '#1f2937',
    },
    borderHover: {
        light: '#d1d5db',
        dark: '#334155',
    },

    // Header/Navbar Colors
    header: {
        light: '#ffffff',
        dark: '#1e293b',
    },
    headerBorder: {
        light: '#e5e7eb',
        dark: '#334155',
    },

    // Navigation Links
    navLink: {
        light: '#334155',
        dark: '#d1d5db',
    },
    navLinkActive: {
        light: '#ffffff',
        dark: '#ffffff',
    },
    navLinkActiveBg: {
        light: '#2563eb',
        dark: '#65a30d',
    },
    navLinkHover: {
        light: '#f1f5f9',
        dark: '#334155',
    },

    // Accent Colors
    accent: {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
    },

    // Button Colors
    button: {
        primary: {
            light: '#2563eb',
            dark: '#6bff00',
        },
        primaryText: {
            light: '#ffffff',
            dark: '#000000',
        },
        danger: {
            light: '#ef4444',
            dark: '#f87171',
        },
    },
};

// Helper function to get color based on theme
export const getThemeColor = (
    theme: ThemeMode,
    colorKey: keyof typeof themeColors
): string => {
    const color = themeColors[colorKey];
    if (typeof color === 'object' && 'light' in color && 'dark' in color) {
        return theme === 'dark' ? color.dark : color.light;
    }
    return color as any;
};

// Common styles generator
export const getCommonStyles = (theme: ThemeMode) => ({
    // Container
    container: {
        backgroundColor: getThemeColor(theme, 'backgroundSecondary'),
        color: getThemeColor(theme, 'text'),
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },

    // Card
    card: {
        backgroundColor: getThemeColor(theme, 'card'),
        border: `1px solid ${getThemeColor(theme, 'border')}`,
        borderRadius: '1rem',
        transition: 'all 0.3s ease',
    },

    // Header/Navbar
    header: {
        backgroundColor: getThemeColor(theme, 'header'),
        borderBottom: `1px solid ${getThemeColor(theme, 'headerBorder')}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
    },
    // themeConfig.ts mein add karein
    danger: {
        lightBg: '#fee2e2',
        lightText: '#dc2626',
        darkBg: 'rgba(239, 68, 68, 0.15)',
        darkText: '#f87171'
    },
    // Text
    text: {
        primary: {
            color: getThemeColor(theme, 'text'),
        },
        secondary: {
            color: getThemeColor(theme, 'textSecondary'),
        },
        muted: {
            color: getThemeColor(theme, 'textMuted'),
        },
    },

    // Button
    button: {
        primary: {
            backgroundColor: getThemeColor(theme, 'primary'),
            color: theme === 'dark' ? '#000000' : '#ffffff',
            border: 'none',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
    },
});
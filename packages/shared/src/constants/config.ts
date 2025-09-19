// Environment variable helper that works in both browser and Node.js
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Node.js environment (including RSS generation scripts)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }

  // Browser environment fallback
  // Note: In browser builds, Vite should expose env vars on process.env via define config
  return defaultValue;
};

export const CONFIG = {
  SITE_URL: getEnvVar('VITE_SITE_URL', 'http://localhost:5173'),
  SITE_TITLE: getEnvVar('VITE_SITE_TITLE', 'Q00 Blog'),
  SITE_DESCRIPTION: getEnvVar('VITE_SITE_DESCRIPTION', 'A modern blog built with React and TanStack Router'),
  AUTHOR_NAME: getEnvVar('VITE_AUTHOR_NAME', 'Q00'),
  AUTHOR_EMAIL: getEnvVar('VITE_AUTHOR_EMAIL', 'hello@q00.dev'),
  GITHUB_REPO: getEnvVar('VITE_GITHUB_REPO', 'Q00/Q00.github.io'),
  POSTS_PER_PAGE: parseInt(getEnvVar('VITE_POSTS_PER_PAGE', '10')),
  FEATURED_POSTS_COUNT: parseInt(getEnvVar('VITE_FEATURED_POSTS_COUNT', '3')),
  GITHUB_CLIENT_ID: getEnvVar('VITE_GITHUB_CLIENT_ID', ''),

  // Hashnode Integration
  HASHNODE_ENABLED: getEnvVar('VITE_HASHNODE_ENABLED', 'false') === 'true',
  HASHNODE_PUBLICATION_ID: getEnvVar('VITE_HASHNODE_PUBLICATION_ID', ''),
  HASHNODE_API_TOKEN: getEnvVar('VITE_HASHNODE_API_TOKEN', ''),
  HASHNODE_PUBLICATION_HOST: getEnvVar('VITE_HASHNODE_PUBLICATION_HOST', ''),
} as const;

export const STORAGE_KEYS = {
  THEME: 'q00-blog-theme',
  USER_PREFERENCES: 'q00-blog-preferences',
  POSTS_CACHE: 'q00-blog-posts-cache',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const;
export const DEFAULT_READING_SPEED = 200; // words per minute
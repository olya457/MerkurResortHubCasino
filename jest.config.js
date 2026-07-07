module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((.pnpm)|((jest-)?react-native|@react-native|@react-native-async-storage|@react-navigation|react-native-maps|react-native-safe-area-context|react-native-screens))/)',
    'node_modules/.pnpm/(?!((jest-)?react-native[^@]*|@react-native\\+[^@]+|@react-native-async-storage\\+[^@]+|@react-navigation\\+[^@]+)@)',
  ],
};

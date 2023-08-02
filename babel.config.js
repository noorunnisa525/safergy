module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@modals': './src/modals',
          '@enums': './src/enums',
          '@locale': './src/locale',
          '@hooks': './src/hooks',
          '@store': './src/redux/store',
          '@slices': './src/redux/slices',
          '@constants': './src/constants',
          '@services': './src/services',
          '@endpoints': './src/endpoints',
          '@styles': './src/styles',
        },
      },
    ],
  ],
};

module.exports = {
  presets: ['babel-preset-expo', 'module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './react'
          }
        }
      ],
    ],
};

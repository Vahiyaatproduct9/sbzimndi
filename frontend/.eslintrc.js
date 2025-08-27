module.exports = {
  extends: ['@react-native/eslint-config'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        '@react-native/no-deep-imports': 'error'
      }
    }
  ]
};
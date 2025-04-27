// metro.config.js

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'), // Example transformer, optional
    },
    resolver: {
      assetExts: [...assetExts, 'db', 'mp4'], // Adjust asset types as needed
      sourceExts: [...sourceExts, 'cjs', 'svg'], // Adjust source extensions as needed
    },
  };
})();

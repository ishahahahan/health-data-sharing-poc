const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to handle assets properly
config.resolver.assetExts.push('ttf');

module.exports = config;

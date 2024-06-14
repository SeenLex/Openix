const { getDefaultConfig } = require('expo/metro-config');  
const config = getDefaultConfig(__dirname); 
config.resolver.sourceExts.push('cjs'); 
config.resolver.extraNodeModules["stream/web"] = require.resolve("stream-browserify") 
module.exports = config;
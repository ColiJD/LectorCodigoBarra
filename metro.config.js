// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Agregar extensión 'cjs' a sourceExts para que Metro la reconozca
config.resolver.sourceExts.push('cjs');

// Deshabilitar la opción unstable_enablePackageExports para compatibilidad
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
 
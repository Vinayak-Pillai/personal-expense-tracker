module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo"], // Remove { jsxImportSource: 'nativewind' }
    ],
    plugins: [
      // Keep this for WatermelonDB
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      // Remove 'nativewind/babel' - it's gone in v5
      "react-native-reanimated/plugin",
    ],
  };
};

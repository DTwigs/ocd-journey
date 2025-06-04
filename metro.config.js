const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// module.exports = config;

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts, ...resolverRest },
    transformer,
    ...configRest
  } = config;
  return {
    ...configRest,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...resolverRest,
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();

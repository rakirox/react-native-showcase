const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
// const config = getDefaultConfig(projectRoot);
const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
};

// Watch the local app folder, and the shared packages (uncomment if you have shared packages
// that are being used between the mono repo's apps)

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(projectRoot), config),
);

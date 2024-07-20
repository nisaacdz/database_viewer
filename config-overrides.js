// config-overrides.js
module.exports = function override(config) {
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "path": false,
      "fs": false,
      "crypto": false,
    };
    return config;
  };
  
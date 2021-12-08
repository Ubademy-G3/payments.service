// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  modulePathIgnorePatterns: ["smartContract"],
};

module.exports = config;

// Or async function
module.exports = async () => ({
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  modulePathIgnorePatterns: ["smartContract"],
});

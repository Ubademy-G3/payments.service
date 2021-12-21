const { UnexpectedException } = require("../../application/exceptions/UnexpectedException");
const logger = require("../logger")("GetAllWalletsUseCase.js");

module.exports = async (repository, params) => {
  try {
    return repository.getAllWallets(params);
  } catch (err) {
    logger.error(`Critical error when getting all wallets: ${err.message}`);
    throw new UnexpectedException(`Unexpected error happened when searching for all wallets ${err}`);
  }
};
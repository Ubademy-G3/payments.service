const { UnexpectedException } = require("../../application/exceptions/UnexpectedException");
const logger = require("../logger")("GetAllDepositsUseCase.js");

module.exports = async (repository, params) => {
  try {
    return repository.getAllDeposits(params);
  } catch (err) {
    logger.error(`Critical error when getting all deposits: ${err.message}`);
    throw new UnexpectedException(`Unexpected error happenede when searching for all deposits ${err}`);
  }
};
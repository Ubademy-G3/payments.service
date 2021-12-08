const { UnexpectedException } = require("../../application/exceptions/UnexpectedException");

module.exports = async (repository, params) => {
  try {
    return repository.getAllDeposits(params);
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happenede when searching for all deposits ${err}`);
  }
};

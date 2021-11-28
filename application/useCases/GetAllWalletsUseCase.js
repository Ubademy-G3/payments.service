const { UnexpectedException } = require("../../application/exceptions/UnexpectedException");

module.exports = async (repository, params) => {
  try {
    return repository.getAllWallets(params);
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happened when searching for all wallets ${err}`);
  }
};
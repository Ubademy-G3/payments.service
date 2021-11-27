const { BadRequest } = require("../exceptions/BadRequestException");
const { UnexpectedError } = require("../exceptions/UnexpectedException");
const { WalletAlreadyExists } = require("../../domain/exceptions/WalletAlreadyExistsException");

module.exports = async (repository) => {
  try {
    return repository.createWallet({privateKey: 'testingPk', address: 'testingAdrs'});
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when creating wallet ${err}`);
  }
};
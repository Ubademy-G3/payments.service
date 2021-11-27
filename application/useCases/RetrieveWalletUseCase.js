const { BadRequest } = require("../exceptions/BadRequestException");
const { WalletNotFound } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedError } = require("../exceptions/UnexpectedException");

module.exports = async (repository, params) => {
  if (!params.id) {
    throw new BadRequest("Missing required field");
  }

  const wallet = await repository.getWalletById(params.id);
  if (!wallet) {
    throw new WalletNotFound("Wallet Id not found");
  }
  try {
    return wallet;
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when getting wallet ${err}`);
  }
};
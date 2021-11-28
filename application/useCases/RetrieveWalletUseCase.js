const { BadRequest } = require("../exceptions/BadRequestException");
const { WalletNotFound } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedError } = require("../exceptions/UnexpectedException");
const ethers = require("ethers");

module.exports = async (repository, params) => {
  if (!params.id) {
    throw new BadRequest("Missing required field");
  }

  const wallet = await repository.getWalletById(params.id);
  if (!wallet) {
    throw new WalletNotFound("Wallet Id not found");
  }
  try {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    return new ethers.Wallet(wallet.privateKey, provider);
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when getting wallet ${err}`);
  }
};

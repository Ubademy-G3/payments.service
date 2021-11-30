const { BadRequest } = require("../exceptions/BadRequestException");
const { NotFoundException } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const ethers = require("ethers");

module.exports = async (repository, params) => {
  const wallet = await repository.getWalletById(params.id);
  if (!wallet) {
    throw new NotFoundException("Wallet Id not found");
  }
  try {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    return new ethers.Wallet(wallet.privateKey, provider);
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happened when getting wallet ${err}`);
  }
};

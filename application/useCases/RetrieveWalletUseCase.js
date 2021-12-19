const { BadRequest } = require("../exceptions/BadRequestException");
const { NotFoundException } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const ethers = require("ethers");
const logger = require("../logger")("RetrieveWalletUseCase.js");

module.exports = async (repository, params) => {
  let wallet = await repository.getWalletById(params.id);
  if (!wallet) {
    logger.warn(`Wallet ${params.id} not found`);
    throw new NotFoundException("Wallet Id not found");
  }
  try {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    const w = new ethers.Wallet(wallet.privateKey, provider);
    const balanceBN = await w.getBalance();
    const balance = await ethers.utils.formatEther(balanceBN);
    await repository.updateWallet(params.id, { balance: balance });
    wallet = await repository.getWalletById(params.id);
    return wallet;
  } catch (err) {
    logger.error(`Critical error when getting wallet ${id}: ${err.message}`);
    throw new UnexpectedException(`Unexpected error happened when getting wallet ${err}`);
  }
};

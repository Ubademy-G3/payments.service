const { BadRequest } = require("../exceptions/BadRequestException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const { AlreadyExists } = require("../../domain/exceptions/AlreadyExistsException");
const ethers = require("ethers");

module.exports = async (repository) => {
  try {
    const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
    // This may break in some environments, keep an eye on it
    const wallet = ethers.Wallet.createRandom().connect(provider);
    return repository.createWallet({privateKey: wallet.privateKey, address: wallet.address});
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happened when creating wallet ${err}`);
  }
};
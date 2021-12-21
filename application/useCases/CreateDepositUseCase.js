const ethers = require("ethers");
const { BadRequestException } = require("../exceptions/BadRequestException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const GetAllWalletsUseCase = require("./GetAllWalletsUseCase");
const logger = require("../logger")("CreateDepositUseCase.js");

const getWallet = async w => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  try {
    return new ethers.Wallet(w[0].privateKey, provider);
  } catch (err) {
    logger.warn(`Bad request: ${err.message}`);
    throw new BadRequestException(err.message);
  }
};

const getContract = (contractAddress, contractAbi, wallet) => {
  return new ethers.Contract(contractAddress, contractAbi, wallet);
};

module.exports = async (repository, walletRepository, params, contractAddress, contractAbi) => {
  const w = await GetAllWalletsUseCase(walletRepository, { address: params.sender_address });
  const wallet = await getWallet(w);
  const basicPayments = await getContract(contractAddress, contractAbi, wallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(params.amount_sent).toHexString(),
  });

  const res = await tx.wait(1).then(
    async receipt => {
      logger.info("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      if (firstEvent && firstEvent.event == "DepositMade") {
        const amount = ethers.utils.formatEther(firstEvent.args.amount);
        const dep = repository.createDeposit({
          sender_address: firstEvent.args.sender,
          amount_sent: amount,
          tx_hash: tx.hash,
        });
        let leftBalance = await wallet.getBalance();
        leftBalance = await ethers.utils.formatEther(leftBalance);
        await walletRepository.updateWallet(w[0].id, { balance: leftBalance });
        return dep;
      } else {
        logger.error(`Critical error when creating deposit in tx ${tx.hash}: ${err.message}`);
        throw new UnexpectedException(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      logger.error(`Reasons list: ${reasonsList}`);
      logger.error(`Message: ${message}`);
      throw new BadRequestException(message);
    },
  );
  return res;
};
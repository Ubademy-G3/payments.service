const { BadRequest } = require("../exceptions/BadRequestException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const ethers = require("ethers");
//refactorizar esto horrible
const repoWallet = require("../../persistence/repositories/WalletRepositoryPostgres")

const getWallet = async (senderAddress) => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const w = await repoWallet.getAllWallets({address: senderAddress});
  return new ethers.Wallet(w[0].privateKey, provider);
}

const getContract = (contractAddress, contractAbi, wallet) => {
  return new ethers.Contract(contractAddress, contractAbi, wallet);
};

module.exports = async (repository, params, contractAddress, contractAbi) => {
  const wallet = await getWallet(params.sender_address)
  const basicPayments = await getContract(contractAddress, contractAbi, wallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(params.amount_sent).toHexString(),
  });
  const res = await tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        const amount = ethers.utils.formatEther(firstEvent.args.amount);
        console.log("AMOUNT")
        console.log(amount)
        const dep = repository.createDeposit({sender_address: firstEvent.args.sender, amount_sent: amount, tx_hash: tx.hash});
        console.log(dep)
        return dep;
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  console.log("TX")
  console.log(res)
  return res;
};
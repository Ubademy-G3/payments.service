const network = "kovan";
//const deployArtifact = require(`../deployments/${network}/UbademyPayments`);
const deployerMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;
const walletRepository = require("../../persistence/repositories/WalletRepositoryPostgres");

function buildServices() {
  return {
    //contractAddress: deployArtifact.address,
    //contractAbi: deployArtifact.abi,
    walletRepository: walletRepository,
    deployerMnemonic,
    infuraApiKey,
    network
  }
}

module.exports = buildServices();
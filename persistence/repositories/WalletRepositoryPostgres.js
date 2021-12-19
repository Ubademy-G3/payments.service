const WalletModel = require("../../domain/WalletModel");
const db = require("../../infrastructure/db/Database");
const WalletRepository = require("../../domain/WalletRepository");
const logger = require("../../application/logger")("WalletRepositoryPostgres.js");

const WalletDb = db.wallets;

module.exports = class extends WalletRepository {
  static async createWallet(walletInfo) {
    logger.debug("Creating new wallet");
    const winfo = {
      address: walletInfo.address,
      private_key: walletInfo.privateKey,
    };
    const newWallet = await WalletDb.create(winfo);
    logger.info("New wallet created");
    logger.debug(`ID of the new wallet: ${newWallet.id}`);
    return new WalletModel(newWallet.id, newWallet.address, newWallet.private_key);
  }

  static async getWalletById(id) {
    logger.debug(`Getting wallet with id: ${id}`);
    const wallet = await WalletDb.findByPk(id);

    if (wallet && Object.keys(wallet).length !== 0) {
      return new WalletModel(wallet.id, wallet.address, wallet.private_key, wallet.balance);
    }
    return null;
  }

  static async getAllWallets(params) {
    logger.debug("Getting all wallets");
    const wallets = await WalletDb.findAll({
      where: params,
      truncate: false,
    });

    return wallets.map(wallet => new WalletModel(wallet.id, wallet.address, wallet.private_key));
  }

  static async updateWallet(id, params) {
    logger.debug(`Updating wallet with id: ${id}`);
    const result = await WalletDb.update(params, {
      where: {
        id,
      },
    });
    logger.info("Wallet successfully updated");
    return result;
  }
};
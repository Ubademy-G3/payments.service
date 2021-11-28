const WalletModel = require("../../domain/WalletModel");
const db = require("../../infrastructure/db/Database");
const WalletRepository = require("../../domain/WalletRepository");

const WalletDb = db.wallets;

module.exports = class extends WalletRepository {
  static async createWallet(walletInfo) {
    const winfo = {
      address: walletInfo.address,
      private_key: walletInfo.privateKey
    }
    const newWallet = await WalletDb.create(winfo);
    return new WalletModel(newWallet.id, newWallet.address, newWallet.private_key);
  }

  static async getWalletById(id) {
    const wallet = await WalletDb.findByPk(id);

    if (wallet && Object.keys(wallet).length !== 0) {
      return new WalletModel(
        wallet.id,
        wallet.address,
        wallet.private_key
      );
    }
    return null;
  }

  static async getAllWallets(params) {
    const wallets = await WalletDb.findAll({
      where: params,
      truncate: false,
    });

    return wallets.map((wallet) => new WalletModel(wallet.id, wallet.address, wallet.private_key));
  }
};
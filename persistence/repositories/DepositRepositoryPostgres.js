const DepositModel = require("../../domain/DepositModel");
const db = require("../../infrastructure/db/Database");
const DepositRepository = require("../../domain/DepositRepository");
const logger = require("../../application/logger")("DepositRepositoryPostgres.js");

const DepositDb = db.deposits;

module.exports = class extends DepositRepository {
  static async createDeposit(depositInfo) {
    logger.debug("Creating new deposit");
    const winfo = {
      sender_address: depositInfo.sender_address,
      amount_sent: depositInfo.amount_sent,
      tx_hash: depositInfo.tx_hash,
    };
    const newDeposit = await DepositDb.create(winfo);
    logger.info("New deposit created");
    logger.debug(`ID of the new deposit: ${newDeposit.id}`);
    return new DepositModel(newDeposit.id, newDeposit.sender_address, newDeposit.amount_sent, newDeposit.tx_hash, null);
  }

  static async getDeposit(params) {
    logger.debug(`Getting deposit with id: ${params.id}`);
    const deposit = await DepositDb.findAll({
      where: params,
      truncate: false,
    });

    if (deposit[0] && Object.keys(deposit[0]).length !== 0) {
      return new DepositModel(
        deposit[0].id,
        deposit[0].sender_address,
        deposit[0].amount_sent,
        deposit[0].tx_hash,
        deposit[0].createdAt,
      );
    }
    return null;
  }

  static async getAllDeposits(params) {
    logger.debug("Getting all deposits");
    const deposits = await DepositDb.findAll({
      where: params,
      truncate: false,
    });

    return deposits.map(
      deposit =>
        new DepositModel(deposit.id, deposit.sender_address, deposit.amount_sent, deposit.tx_hash, deposit.createdAt),
    );
  }
};
const getAllWallets = require("../useCases/GetAllWalletsUseCase");
const retrieveWallet = require("../useCases/RetrieveWalletUseCase");
const createWallet = require("../useCases/CreateWalletUseCase");
const { NotFoundException } = require("../../domain/exceptions/NotFoundException");
const { BadRequestException } = require("../exceptions/BadRequestException");
const { AlreadyExistsException } = require("../../domain/exceptions/AlreadyExistsException");
const serializer = require("../serializers/WalletSerializer");
const logger = require("../logger")("WalletController.js");

exports.getAllWallets = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Get all wallets");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.walletRepository;

  getAllWallets(repository, req.query)
    .then(wallets => res.status(200).json(serializer(wallets)))
    .catch(err => {
      logger.error(`Critical error when getting all wallets: ${err.message}`);
      res.status(500).send({ message: err.message })
    });    
  return null;
};

exports.getWalletById = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Get wallet by id");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.walletRepository;
  retrieveWallet(repository, req.params)
    .then(wallet => res.status(200).json(serializer(wallet)))
    .catch(err => {
      if (err instanceof NotFoundException) {
        return res.status(404).send({ message: err.message });
      }
      logger.error(`Critical error while getting wallet by id: ${err.message}`);
      return res.status(500).send({ message: err.message });
    });
  return null;
};

exports.createWallet = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Create new wallet");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  const repository = req.app.serviceLocator.walletRepository;

  createWallet(repository)
    .then(wallet => res.status(200).json(serializer(wallet)))
    .catch(err => {
      if (err instanceof AlreadyExistsException) {
        logger.warn("Wallet already exists");
        return res.status(409).send({ message: err.message });
      }
      if (err instanceof BadRequestException) {
        logger.warn(`Bad request: ${err.message}`);
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
  return null;
};
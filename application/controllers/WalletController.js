const getAllWallets = require("../useCases/GetAllWalletsUseCase");
const retrieveWallet = require("../useCases/RetrieveWalletUseCase");
const createWallet = require("../useCases/CreateWalletUseCase");
const { NotFoundException } = require("../../domain/exceptions/NotFoundException");
const { BadRequestException } = require("../exceptions/BadRequestException");
const { AlreadyExistsException } = require("../../domain/exceptions/AlreadyExistsException");
const serializer = require("../serializers/WalletSerializer");

exports.getAllWallets = (req, res) => {
  const apikey = req.get("authorization");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.walletRepository;

  getAllWallets(repository, req.query)
    .then(wallets => res.status(200).json(serializer(wallets)))
    .catch(err => res.status(500).send({ message: err.message }));
  return null;
};

exports.getWalletById = (req, res) => {
  const apikey = req.get("authorization");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.walletRepository;
  retrieveWallet(repository, req.params)
    .then(wallet => res.status(200).json(serializer(wallet)))
    .catch(err => {
      if (err instanceof NotFoundException) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
  return null;
};

exports.createWallet = (req, res) => {
  const apikey = req.get("authorization");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const repository = req.app.serviceLocator.walletRepository;

  createWallet(repository)
    .then(wallet => res.status(200).json(serializer(wallet)))
    .catch(err => {
      if (err instanceof AlreadyExistsException) {
        return res.status(409).send({ message: err.message });
      }
      if (err instanceof BadRequestException) {
        return res.status(400).send({ message: err.message });
      }
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
  return null;
};

const getAllDeposits = require("../useCases/GetAllDepositsUseCase");
const retrieveDeposit = require("../useCases/RetrieveDepositUseCase");
const createDeposit = require("../useCases/CreateDepositUseCase");
const { NotFoundException } = require("../../domain/exceptions/NotFoundException");
const { BadRequestException } = require("../exceptions/BadRequestException");
const { AlreadyExistsException } = require("../../domain/exceptions/AlreadyExistsException");
const serializer = require("../serializers/DepositSerializer");
const { restart } = require("nodemon");
const logger = require("../logger")("DepositController.js");

exports.createDeposit = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Create new deposit");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }

  const repository = req.app.serviceLocator.depositRepository;
  const contractAddress = req.app.serviceLocator.contractAddress;
  const contractAbi = req.app.serviceLocator.contractAbi;
  const walletRepository = req.app.serviceLocator.walletRepository;

  createDeposit(repository, walletRepository, req.body, contractAddress, contractAbi)
    .then(deposit => res.status(200).json(serializer(deposit)))
    .catch(err => {
      if (err instanceof AlreadyExistsException) {
        logger.warn("Deposit already exists");
        return res.status(409).send({ message: err.message });
      }
      if (err instanceof BadRequestException) {
        return res.status(400).send({ message: err.message });
      }
      logger.error(`Critical error while creating deposit: ${err.message}`);
      return res.status(500).send({ message: err.message });
    });
  return null;
};

exports.getDeposit = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Get deposit");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.depositRepository;
  retrieveDeposit(repository, req.params)
    .then(deposit => res.status(200).json(serializer(deposit)))
    .catch(err => {
      if (err instanceof NotFoundException) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
  return null;
};

exports.getAllDeposits = (req, res) => {
  const apikey = req.get("authorization");
  logger.debug("Get all deposits");
  if (!apikey || apikey !== process.env.PAYMENTSERVICE_APIKEY) {
    logger.warn("Unauthorized");
    return res.status(401).send({ message: "Unauthorized" });
  }
  const repository = req.app.serviceLocator.depositRepository;

  getAllDeposits(repository, req.query)
    .then(deposits => res.status(200).json(serializer(deposits)))
    .catch(err => res.status(500).send({ message: err.message }));
  return null;
};
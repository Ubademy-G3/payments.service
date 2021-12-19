const { BadRequest } = require("../exceptions/BadRequestException");
const { NotFound } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedError } = require("../exceptions/UnexpectedException");
const logger = require("../logger")("RetrieveDepositUseCase.js");


module.exports = async (repository, params) => {
  const deposit = await repository.getDeposit({ tx_hash: params.txHash });
  if (!deposit) {
    logger.warn(`Deposit ${params.id} not found`);
    throw new NotFound("Deposit Id not found");
  }
  try {
    return deposit;
  } catch (err) {
    logger.error(`Critical error when getting user ${params.id}: ${err.message}`);
    throw new UnexpectedError(`Unexpected error happened when getting deposit ${err}`);
  }
};
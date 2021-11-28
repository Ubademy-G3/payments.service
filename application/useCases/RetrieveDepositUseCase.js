const { BadRequest } = require("../exceptions/BadRequestException");
const { NotFound } = require("../../domain/exceptions/NotFoundException");
const { UnexpectedError } = require("../exceptions/UnexpectedException");

module.exports = async (repository, params) => {
  const deposit = await repository.getDeposit({ tx_hash: params.txHash });
  if (!deposit) {
    throw new NotFound("Deposit Id not found");
  }
  try {
    return deposit;
  } catch (err) {
    throw new UnexpectedError(`Unexpected error happened when getting deposit ${err}`);
  }
};

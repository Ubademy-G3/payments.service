const { BadRequest } = require("../exceptions/BadRequestException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const { AlreadyExists } = require("../../domain/exceptions/AlreadyExistsException");

module.exports = async (repository, params) => {
  try {
    return repository.createDeposit({sender_address: params.sender_address, amount_sent: params.amount_sent, tx_hash: 'testingHash2'});
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happened when creating deposit ${err}`);
  }
};
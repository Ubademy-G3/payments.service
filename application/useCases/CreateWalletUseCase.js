const { BadRequest } = require("../exceptions/BadRequestException");
const { UnexpectedException } = require("../exceptions/UnexpectedException");
const { AlreadyExists } = require("../../domain/exceptions/AlreadyExistsException");

module.exports = async (repository) => {
  try {
    return repository.createWallet({privateKey: 'testingPk', address: 'testingAdrs'});
  } catch (err) {
    throw new UnexpectedException(`Unexpected error happened when creating wallet ${err}`);
  }
};
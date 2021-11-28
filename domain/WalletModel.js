module.exports = class Wallet {
  constructor(UUID, address, privateKey) {
    this.id = UUID;
    this.address = address;
    this.privateKey = privateKey;
  }
};

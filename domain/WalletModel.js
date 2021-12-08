module.exports = class Wallet {
  constructor(UUID, address, privateKey, balance) {
    this.id = UUID;
    this.address = address;
    this.privateKey = privateKey;
    this.balance = balance;
  }
};

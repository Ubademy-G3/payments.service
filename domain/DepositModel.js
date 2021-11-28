module.exports = class Deposit {
    constructor(UUID, senderAddress, amountSent, txHash) {
      this.id = UUID;
      this.senderAddress = senderAddress;
      this.amountSent = amountSent;
      this.txHash = txHash;
    }
  };
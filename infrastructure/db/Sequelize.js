module.exports = (database, Sequelize) => {
  const Wallet = database.define("wallets", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    address: {
      type: Sequelize.STRING,
    },
    private_key: {
      type: Sequelize.STRING,
    },
    balance: {
      type: Sequelize.NUMBER,
      defaultValue: 0,
    },
  });

  const Deposit = database.define("deposits", {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    tx_hash: {
      type: Sequelize.STRING,
    },
    sender_address: {
      type: Sequelize.STRING,
    },
    amount_sent: {
      type: Sequelize.STRING,
      defaultValue: "0",
    },
  });

  return {
    wallet: Wallet,
    deposit: Deposit,
  };
};

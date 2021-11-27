module.exports = (database, Sequelize) => {
    const Wallet = database.define("wallets", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      address: {
        type: Sequelize.STRING
      },
      private_key: {
        type: Sequelize.STRING
      }
    });
  
    return Wallet;
};
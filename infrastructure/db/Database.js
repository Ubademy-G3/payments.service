if(process.env.NODE_ENV !== "testing"){
    const Sequelize = require("sequelize");
    
    let database = null;
    
    if (process.env.NODE_ENV !== "stage") {
      console.log("DATABASE_URL")
      console.log(process.env.DATABASE_URL)
      database = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        operatorsAliases: Sequelize.Op,
        define: { timestamp: false },
      });
    } else {
      database = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        operatorsAliases: Sequelize.Op,
        define: { timestamp: false },
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
    }
    
    const db = {};
    
    db.Sequelize = Sequelize;
    db.sequelize = database;
    
    db.wallets = require("./Sequelize")(database, Sequelize);
    
    module.exports = db;
}
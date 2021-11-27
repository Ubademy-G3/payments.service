const express = require("express");
const walletController = require("../../application/controllers/WalletController");
const depositController = require("../../application/controllers/DepositController");

const router = express.Router();

router.get("/wallet", walletController.getAllWallets);
router.get("/wallet/:id", walletController.getWalletById);
router.post("/wallet", walletController.createWallet);
//router.post("/deposit", walletController.createDeposit);
//router.get("/deposit/:txHash", walletController.getDeposit);

module.exports = router;

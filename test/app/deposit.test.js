/*const supertest = require("supertest");
const app = require("../../app");
const depositRepository = require("../../persistence/repositories/DepositRepositoryPostgres");

const depositRes = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "sender_address": "string",
    "amount_sent": "string"
  }

const depositReq = {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "senderAddress": "string",
    "amountSent": "string"
  }

describe("depositController", () => {
  let request;
  let res;
  let spyDepositRepository;

  describe("/deposit", () => {
    const path = "/deposit";

    beforeEach(() => {
      spyDepositRepository = {};
      request = supertest(app);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("GET", () => {
      describe("when unexpected error happens", () => {
        beforeEach(async () => {
          spyWalletRepository.getAllWallets = jest
            .spyOn(walletRepository, "getAllWallets")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(path).set("authorization", "abc123");
        });

        it("should respond with unexpected error status", () => {
          expect(res.status).toEqual(500);
        });
      });

      describe("when unexpected error happens gettin wallet by id", () => {
        it("should respond with unexpected error status", async () => {
            spyWalletRepository.getWalletById = jest
            .spyOn(walletRepository, "getWalletById")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(`${path}/1234`).set("authorization", "abc123");
          expect(res.status).toEqual(500);
        });
      });
    
      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          res = await request.get(path).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

      describe("when invalid id getting wallet by id", () => {
        it("should respond with wallet not found status and body", async () => {
            spyWalletRepository.getWalletById = jest
            .spyOn(walletRepository, "getWalletById")
            .mockReturnValueOnce(null);

          res = await request.get(`${path}/banana`).set("authorization", "abc123");
          expect(res.status).toEqual(404);
          expect(res.body).toEqual({ message: "Wallet Id not found" });
        });
      });
      
      describe("when invalid apikey getting wallet by id", () => {
        it("should respond with unauthorized error status and body", async () => {
            spyWalletRepository.getWalletById = jest
            .spyOn(walletRepository, "getWalletById")
            .mockReturnValueOnce(walletsReq[0]);

          res = await request.get(`${path}/${walletsReq[0].id}`).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });

    describe("POST", () => {
      describe("when invalid apikey", () => {
        it("should respond with unauthorized error status and body", async () => {
          res = await request.post(`${path}`).set("authorization", "banana");
          expect(res.status).toEqual(401);
          expect(res.body).toEqual({ message: "Unauthorized" });
        });
      });
    });
  });
});
});*/

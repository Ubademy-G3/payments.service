const supertest = require("supertest");
const app = require("../../app");
const walletRepository = require("../../persistence/repositories/WalletRepositoryPostgres");

const walletsReq = [
    {
        "id": "fb34ff6e-2d33-4c54-89f4-4fb7f94ca523",
        "address": "0x222222222222222222222222222222222",
        "privateKey": "0x22222222222222222222222222222222222222"
    },
    {
        "id": "3a8cf12d-6e39-451c-ad6f-2d5b0274032c",
        "address": "0x11111111111111111111111111111111111",
        "privateKey": "0x111111111111111111111111111111111111111"
    }
];

const walletsRes = [
    {
        "id": "fb34ff6e-2d33-4c54-89f4-4fb7f94ca523",
        "address": "0x222222222222222222222222222222222",
        "private_key": "0x22222222222222222222222222222222222222"
    },
    {
        "id": "3a8cf12d-6e39-451c-ad6f-2d5b0274032c",
        "address": "0x11111111111111111111111111111111111",
        "private_key": "0x111111111111111111111111111111111111111"
    }
];

describe("walletController", () => {
  let request;
  let res;
  let spyWalletRepository;

  describe("/wallet", () => {
    const path = "/wallet";

    beforeEach(() => {
      spyWalletRepository = {};
      request = supertest(app);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("GET", () => {
      describe("when there are wallets", () => {
        it("should return all wallets", async () => {
          spyWalletRepository.getAllWallets = jest
            .spyOn(walletRepository, "getAllWallets")
            .mockReturnValueOnce(walletsReq);

          res = await request.get(path).set("authorization", "abc123");
          expect(res.status).toEqual(200);
          expect(res.header["content-type"]).toMatch(/json/);
          expect(res.body).toEqual(walletsRes);
        });
      });

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
});

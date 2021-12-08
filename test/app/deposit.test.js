const supertest = require("supertest");
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
          spyDepositRepository.getAllDeposits = jest
            .spyOn(depositRepository, "getAllDeposits")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(path).set("authorization", "abc123");
        });

        it("should respond with unexpected error status", () => {
          expect(res.status).toEqual(500);
        });
      });

      describe("when unexpected error happens gettin deposit by hash", () => {
        it("should respond with unexpected error status", async () => {
          spyDepositRepository.getDeposit = jest
            .spyOn(depositRepository, "getDeposit")
            .mockImplementation(() => {
              throw new Error();
            });

          res = await request.get(`${path}/?txHash=1234`).set("authorization", "abc123");
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
      
      describe("when invalid apikey getting deposit by hash", () => {
        it("should respond with unauthorized error status and body", async () => {
          spyDepositRepository.getDeposit = jest
            .spyOn(depositRepository, "getDeposit")
            .mockReturnValueOnce(depositReq);

          res = await request.get(`${path}/${depositReq.id}`).set("authorization", "banana");
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

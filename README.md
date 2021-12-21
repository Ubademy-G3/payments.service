# Payments Microservice
[![CI](https://github.com/Ubademy-G3/payments.service/actions/workflows/test.yml/badge.svg)](https://github.com/Ubademy-G3/payments.service/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Ubademy-G3/payments.service/branch/main/graph/badge.svg?token=Z7FKUR4UIW)](https://codecov.io/gh/Ubademy-G3/payments.service)

Service dedicated to the management of payments and wallets of the users of the platform

# Directory structure

```tree
├── app.js
├── application
│   ├── controllers
│   │   ├── DepositController.js
│   │   └── WalletController.js
│   ├── exceptions
│   │   ├── BadRequestException.js
│   │   └── UnexpectedException.js
│   ├── logger.js
│   ├── serializers
│   │   ├── DepositSerializer.js
│   │   └── WalletSerializer.js
│   └── useCases
│       ├── CreateDepositUseCase.js
│       ├── CreateWalletUseCase.js
│       ├── GetAllDepositsUseCase.js
│       ├── GetAllWalletsUseCase.js
│       ├── RetrieveDepositUseCase.js
│       └── RetrieveWalletUseCase.js
├── artifacts
│   ├── build-info
│   │   └── 4c8908246a70ac1b9e813193651f1863.json
│   ├── contracts
│   │   └── UbademyPayments.sol
│   │       ├── UbademyPayments.dbg.json
│   │       └── UbademyPayments.json
│   ├── hardhat
│   │   └── console.sol
│   │       ├── console.dbg.json
│   │       └── console.json
│   └── @openzeppelin
│       └── contracts
│           ├── access
│           │   └── Ownable.sol
│           │       ├── Ownable.dbg.json
│           │       └── Ownable.json
│           ├── math
│           │   ├── Math.sol
│           │   │   ├── Math.dbg.json
│           │   │   └── Math.json
│           │   └── SafeMath.sol
│           │       ├── SafeMath.dbg.json
│           │       └── SafeMath.json
│           └── utils
│               └── Context.sol
│                   ├── Context.dbg.json
│                   └── Context.json
├── cache
│   └── solidity-files-cache.json
├── contracts
│   └── UbademyPayments.sol
├── CONTRIBUTING.md
├── deploy
│   └── deploy.ts
├── deployments
│   └── kovan
│       ├── solcInputs
│       │   └── faafbcdd2e82f846dc1ff6a0e268ec31.json
│       └── UbademyPayments.json
├── docker-compose.yml
├── Dockerfile
├── domain
│   ├── DepositModel.js
│   ├── DepositRepository.js
│   ├── exceptions
│   │   ├── AlreadyExistsException.js
│   │   ├── NotAuthorizedException.js
│   │   └── NotFoundException.js
│   ├── WalletModel.js
│   └── WalletRepository.js
├── hardhat.config.ts
├── heroku-entrypoint.sh
├── heroku.yml
├── index.js
├── infrastructure
│   ├── config
│   │   └── ServiceLocator.js
│   ├── db
│   │   ├── Database.js
│   │   └── Sequelize.js
│   └── routes
│       └── payments.js
├── jest.config.js
├── LICENSE
├── logs.log
├── monitoring
│   └── datadog.yml
├── package.json
├── package-lock.json
├── persistence
│   └── repositories
│       ├── DepositRepositoryPostgres.js
│       └── WalletRepositoryPostgres.js
├── README.md
├── swagger.json
├── test
│   ├── app
│   │   ├── deposit.test.js
│   │   └── wallet.test.js
│   └── smartContract
│       ├── common-fixtures.ts
│       ├── receivePayment.test.ts
│       └── sendPayment.test.ts
├── tsconfig.json
└── typechain
    ├── factories
    │   ├── Ownable__factory.ts
    │   └── UbademyPayments__factory.ts
    ├── index.ts
    ├── Ownable.d.ts
    └── UbademyPayments.d.ts
```
# Local Environment

## Requerimientos

* Docker
* Docker-compose

## Environment variables

To run this application you need to define the following environment variables:

```
MNEMONIC = YOUR_MNEMONIC
INFURA_API_KEY = YOUR_INFURA_APIKEY
PAYMENTSERVICE_APIKEY = YOUR_PAYMENTS_SERVICE_APIKEY
```

## Build and Deploy Services

```docker-compose up -d --build```

## Stop services

```docker-compose stop```

## Down services and remove containers, networks, volumes and images created by 'up'

```docker-compose down```

## To run tests

```docker-compose exec node npm run test```


You can try it out at <https://staging-payments-service-app.herokuapp.com/api-docs/>

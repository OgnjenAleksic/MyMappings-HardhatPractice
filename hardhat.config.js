const { defaultAbiCoder } = require("@ethersproject/abi");

require("dotenv").config();
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

const RPC_URL = process.env.RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },

    goerli: {
      url: RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
    },
  },

  solidity: {
    compilers: [{ version: "0.8.17" }],
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },

  gasReporter: {
    enabled: false,
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

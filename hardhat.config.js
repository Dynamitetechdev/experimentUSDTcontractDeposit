require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
// yarn hardhat deploy --network mainnet
const RPC = process.env.SEPOLIA_RPC;
const PRIVATE_KEY1 = "a8a060a6bff5cef2fb7a1b41501883df9232afaeb4f0f1cf746fb049678f86f6";
const PRIVATE_KEY2 = "96d70eb458b763ede7c38a3e5236959c4300e6753f78a02935aeec69ef2cc0b4";
const privateKeys = [PRIVATE_KEY1, PRIVATE_KEY2];
const mainnetPK = process.env.MAINNETPK
const mainnetRPC = "https://eth-mainnet.g.alchemy.com/v2/hGluvSAm8sDNrouUHkamnxFWsZ-I5kzI"
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: RPC,
      accounts: privateKeys,
      chainId: 5,
      blockConfirmations: 6,
    },
    sepolia: {
      url: RPC,
      accounts: privateKeys,
      chainId: 11155111,
      blockConfirmations: 6,
    },
    // mainnet:{
    //   url: mainnetRPC,
    //   accounts: mainnetPK,
    //   chainId: 1,
    //   blockConfirmations: 6
    // }
  },
  solidity: "0.8.20",

  namedAccounts: {
    deployer: {
      default: 0,
      5: 0,
    },
    user: {
      default: 1,
      5: 1,
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "gas-reporter.txt",
    currency: "USD",
    coinmarketcap: "d4720ed6-4d46-4490-9a1c-c2b4539b3b5e",
    token: "ETH",
    includeIntrinsicGas: false
  },
  etherscan: {
    apiKey: {
      goerli: "VDPYH9I76NQNVCB1J68BGN5CV8BM7NPQSB",
      sepolia: "XBSX3YY9DUTU3W1MQXA8CP83PA16IPHW5F",
      mainnet: "XBSX3YY9DUTU3W1MQXA8CP83PA16IPHW5F"
    },
  },

  mocha: {
    timeout: 400000000, //200 sec
  },
};
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.28"
      }
    ]
  },
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

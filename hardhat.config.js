require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      gas: 120000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/8918959b567c47418752523f7b91a9cc",
      accounts: [process.env.PRIVATE_KEY],
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    fantomOpera: {
      url: "https://rpc.ftm.tools",
      chainId: 250,
      accounts: [],
    },

    fantomTest: {
      // url: "https://rpc.testnet.fantom.network/",
      url: "https://xapi.testnet.fantom.network/lachesis",
      chainId: 0xfa2,
      accounts: [],
    },
  },
  etherscan: {
    apiKey: "X48UAVCPSAX87AYAVS72DCIQKAGIGM93I5", //  ftmscan
  },
};

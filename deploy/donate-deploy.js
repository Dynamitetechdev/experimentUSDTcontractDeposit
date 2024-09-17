const { network } = require("hardhat");
const { verify } = require("../utils/verify");
module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const blockConfirmations = chainId == 31337 ? 1 : 6;

  log("----Deploying Contract----");
  const arguments = ['0x7169D38820dfd117C3FA1f22a697dBA58d90BA06']; // USDT
  // const arguments = ['0x159C6238A6a4B463bdc549a057468b53F84c64fe']; // Fake USDT
  const DonationContract = await deploy("MainUSDTExperiment", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: blockConfirmations,
  });
  log("----Contract Deployed----");

  // if (chainId !== 31337 && process.env.ETHERSCAN_APIKEY) {
    console.log("--Contract Verifying-------");
    await verify(DonationContract.address, arguments);
    console.log("--Contract verified-------");
  // }
};

module.exports.tags = ["all", "donation"];

const { network, deployments, getNamedAccounts } = require("hardhat");
const { verify } = require("../verification/verify");
const chainId = network.config.chainId;

module.exports = async function () {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const { user } = await getNamedAccounts();
  const myMappings = await deploy("MyMappings", {
    from: deployer,
    args: [user],
    log: true,
  });

  log(`Contract deployed at ${myMappings.address}!`);
  await verify(myMappings.address, [user]);
};

module.exports.tags = ["all", "MyMappings"];

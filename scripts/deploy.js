const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("token deployed to:", token.address);

  const MasterChef = await hre.ethers.getContractFactory("MasterChef");
  const chef = await MasterChef.deploy(
    token.address,
    owner.address, // dev address
    owner.address, // fee address
    "3000000000000000", // token per sec (18 decimals)
    0 // start startTimestamp -- change this
  );
  await chef.deployed();
  console.log("MasterChef deployed to:", chef.address);

  await token.transferOwnership(chef.address);

  console.log("Done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

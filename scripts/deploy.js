const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const Cake = await hre.ethers.getContractFactory("CakeToken");
  const cake = await Cake.deploy();
  await cake.deployed();
  console.log("CakeToken deployed to:", cake.address);

  const Syrup = await hre.ethers.getContractFactory("SyrupBar");
  const syrup = await Syrup.deploy(cake.address);
  await syrup.deployed();
  console.log("SyrupBar deployed to:", syrup.address);

  const MasterChef = await hre.ethers.getContractFactory("MasterChef");
  const chef = await MasterChef.deploy(
    cake.address,
    syrup.address,
    owner.address, // dev address
    "40000000000000000000", // cake per block
    0 // start block
  );
  await chef.deployed();
  console.log("MasterChef deployed to:", chef.address);
  await cake.transferOwnership(chef.address);
  await syrup.transferOwnership(chef.address);

  console.log("Done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

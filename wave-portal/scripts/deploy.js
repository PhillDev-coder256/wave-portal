const hre = require("hardhat");

const main = async () => {
  // Get the contract factory
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Deploy the contract
  const waveContract = await waveContractFactory.deploy();

  // Wait for deployment to finish
  await waveContract.waitForDeployment();

  // Get contract address
  console.log("WavePortal contract deployed to:", await waveContract.getAddress());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

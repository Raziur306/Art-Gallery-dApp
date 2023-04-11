const hre = require("hardhat");

async function main() {

  const GalleryContract = await hre.ethers.getContractFactory("GalleryContract");
  const contract = await GalleryContract.deploy();

  await contract.deployed();
  console.log("Address of contract: ", contract.address);

}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


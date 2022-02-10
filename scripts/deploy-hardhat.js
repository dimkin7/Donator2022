const hre = require("hardhat");

async function main() {

  //публикация
  const DonatorBDA = await hre.ethers.getContractFactory("DonatorBDA");
  const donator = await DonatorBDA.deploy();
  await donator.deployed();
  console.log("DonatorBDA deployed to:", donator.address);

}

//запуск
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

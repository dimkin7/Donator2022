const hre = require("hardhat");

async function main() {

  //публикация
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  const Donator2022 = await hre.ethers.getContractFactory("Donator2022");
  const donator = await Donator2022.deploy();
  await donator.deployed();
  console.log("Donator2022 deployed to:", donator.address);

}

//запуск
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

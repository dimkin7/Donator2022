require("@nomiclabs/hardhat-waffle");
require("solidity-coverage")
require("dotenv").config();
require("@nomiclabs/hardhat-web3");


task("makeDonation", "Make donation")
  .addParam("key", "Your private key")
  .addParam("amount", "Amount")
  .setAction(async (taskArgs) => {

    const provider = new ethers.providers.AlchemyProvider(network = "rinkeby");

    const sender = new ethers.Wallet(taskArgs.key, provider);

    const contract = '0x8BBc205Ec38F6AcA8dA9e82Cbfe76662A5E0B987';

    const tx2 = await sender.sendTransaction({
      to: contract,
      value: taskArgs.amount,
    });
    await tx2.wait();
  });

/*
task("makeDonation", "Make donation", async (taskArgs, hre) => {
  //Donation.makeDonation();

  /*const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }





  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
    web3.eth.sendTransaction({
      from: account.address,
      to: '0x8BBc205Ec38F6AcA8dA9e82Cbfe76662A5E0B987',
      value: 333
    })
      .then(function (receipt) {
        console.log(receipt);
      });
  }



  


});*/


task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const [contract] = await ethers.getSigners();

  console.log(contract.address);

});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RENKEBY_URL || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

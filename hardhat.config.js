require("@nomiclabs/hardhat-waffle");
require("solidity-coverage")



task("makeDonation", "Make donation", async (taskArgs, hre) => {
  //Donation.makeDonation();

  /*const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }*/
});


task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
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
  solidity: "0.8.4",
};

require("@nomiclabs/hardhat-waffle");
require("solidity-coverage")
require("dotenv").config();
require("@nomiclabs/hardhat-web3");

//https://rinkeby.etherscan.io/address/0x8bbc205ec38f6aca8da9e82cbfe76662a5e0b987

//npx hardhat makeDonation --network rinkeby --key PRIVATE_KEY --amount 333
task("makeDonation", "Make donation")
  .addParam("key", "Your private key")
  .addParam("amount", "Amount")
  .setAction(async (taskArgs) => {

    const provider = new ethers.providers.AlchemyProvider(network = "rinkeby");
    const contractAddr = '0x8BBc205Ec38F6AcA8dA9e82Cbfe76662A5E0B987';
    const sender = new ethers.Wallet(taskArgs.key, provider);

    const tx2 = await sender.sendTransaction({
      to: contractAddr,
      value: taskArgs.amount,
    });
    await tx2.wait();
  });

//npx hardhat withdraw --network rinkeby --key PRIVATE_KEY --toaddr 0x7EA751f8B46E08F7397904A39b3e08901B5D1659 --amount 22
task("withdraw", "Withdraw")
  .addParam("key", "Your private key")
  .addParam("toaddr", "To address")
  .addParam("amount", "Amount")
  .setAction(async (taskArgs) => {

    const abi = [
      "function withdraw(address _sendTo, uint256 _amount)"
    ];
    const provider = new ethers.providers.AlchemyProvider(network = "rinkeby");
    const contractAddr = '0x8BBc205Ec38F6AcA8dA9e82Cbfe76662A5E0B987';
    const signer = new ethers.Wallet(taskArgs.key, provider);
    const donator2022 = new ethers.Contract(contractAddr, abi, signer);
    
    //console.log(donator2022);

    withdraw = await donator2022.withdraw(taskArgs.toaddr, taskArgs.amount);
    await withdraw.wait();
  });


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

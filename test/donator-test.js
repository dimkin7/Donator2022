const { expect } = require("chai");
const { ethers } = require("hardhat");

let balanceOwner;

before(async function () {
  Donator2022 = await ethers.getContractFactory('Donator2022');
  donator2022 = await Donator2022.deploy();
  await donator2022.deployed();
  [owner, addr1, addr2, addr3] = await ethers.getSigners();
});


describe("Donator2022", function () {

  it("Проверка балансов", async function () {
    //console.log('donator2022.address:', donator2022.address);
    //console.log('addr1.address:', addr1.address);

    //начальный баланс контракта = 0
    balance = await ethers.provider.getBalance(donator2022.address);
    expect(0).to.equal(balance);

    //сохраняем начальный баланс владельца после публикации контракта
    balanceOwner = await ethers.provider.getBalance(owner.address);
    //console.log('balanceOwner:', balanceOwner);

    //отправляем пожертвование
    //5+6 от addr1
    transactionHash = await addr1.sendTransaction({
      to: donator2022.address,
      value: ethers.utils.parseEther("5.0"),
    });
    transactionHash = await addr1.sendTransaction({
      to: donator2022.address,
      value: ethers.utils.parseEther("6.0"),
    });

    //22 от addr2
    transactionHash = await addr2.sendTransaction({
      to: donator2022.address,
      value: ethers.utils.parseEther("22.0"),
    });

    //читаем баланс контракта 5+6+22=33
    balance = await ethers.provider.getBalance(donator2022.address);
    expect(ethers.utils.parseEther("33.0")).to.equal(balance);
  });

  it("Проверка ошибок", async function () {
    //перевод суммы = 0
    await expect( addr2.sendTransaction({ to: donator2022.address, value: ethers.utils.parseEther("0.0"), }) ).to.be.revertedWith("Amount must be greater than 0");
    //вывод слишком большой суммы
    await expect( donator2022.withdraw(addr3.address, ethers.utils.parseEther("34.0")) ).to.be.revertedWith("Incorrect amount");
  });


  it("Читаем, сколько внес пользователь", async function () {
    balance = await donator2022.getAmountForDonator(addr1.address);
    expect(ethers.utils.parseEther("11.0")).to.equal(balance);
  });


  it("Вывести сумму", async function () {
    withdraw = await donator2022.withdraw(addr3.address, ethers.utils.parseEther("3.0"));

    //баланс addr3 += 3.0 ETH
    balance = await ethers.provider.getBalance(addr3.address);
    expect(ethers.utils.parseEther("10003.0")).to.equal(balance);
  });

  it("Список пользователей, сделавших пожертвование", async function () {
    dons = await donator2022.getDonators();
    //console.log('don1:', dons);
    expect(dons.length).to.equal(2);
  });


});

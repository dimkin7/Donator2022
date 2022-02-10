// SPDX-License-Identifier: GPL-3.0
// смарт контракт для приема пожертвований в виде нативной валюты (ETH, BNB,MATIC...)
// https://github.com/dimkin7/DonatorBDA
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DonatorBDA {
    //хранение суммы пожертвований каждого пользователя
    mapping(address => uint256) private balance;
    // хранение адресов всех пользователей сделавших пожертвования
    address[] private donatorArray;

    address private owner;

    constructor() {
        owner = msg.sender;
        console.log("Deploying a DonatorBDA with owner:", owner);
    }

    event Received(address, uint256);

    // внести пожертвование
    receive() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        //сохраняем нового дарителя
        if(balance[msg.sender] == 0){
            donatorArray.push(msg.sender);
        }

        balance[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // Вывести пожертвование (любая сумма) на любой адрес. Данное действие может сделать только создатель контракта;
    function withdraw(address _sendTo, uint256 _amount)
        external
        payable
        onlyOwner
    {
        require(_amount > 0 && _amount <= msg.value, "Incorrect amount");

        (bool success, ) = _sendTo.call{value: _amount}("");
        require(success, "Failed to withdraw");
    }

    //view функция, которая возвращает список всех пользователей когда либо вносивших пожертвование. В списке не должно быть повторяющихся элементов
    function getDonators() external view returns (address[] memory) {
        return donatorArray;
    }

    //view функция, позволяющая получить общую сумму всех пожертвований для определённого адреса
    function getAmountForDonator(address _donator) external view returns (uint) {
        return balance[_donator];
    }


}

// 5) Написать unit test (использовать npx hardhat test);
// - В проекте установлен и настроен плагин solidity-coverage
// - В папке test имеются файлы unit тестов, обеспечивающих 100% покрытие контракта по всем показателям (statements, branch, functions, lines)


// 6) Написать script deploy в тестовую сеть rinkeby (использовать "hardhat run scripts/NAME_FILE --network rinkeby";
// - В папке scripts имеется скрипт для публикации контракта в одну из тестовых сетей

// 7) Написать таски для сети rinkeby (использовать "npx hardhat NAME_FILE --network renkeby").
// - В папке tasks имеются hardhat task позволяющие взаимодействовать с опубликованным контрактом 
//(внести пожертвование, вывести деньги на определённый адрес в определённом количестве, получить список жертвователей, получить сумму пожертвований у определённого адреса)

// - Корректно настроен hardhat.config.js(ts), у hardhat есть подробная документация по каждому параметру
// - Все приватные данные (приватный ключ, мнемоник, ключи доступа Infura, Alchemy...) сохранены в файл .env, который должен остаться только у вас!



// SPDX-License-Identifier: GPL-3.0
// смарт контракт для приема пожертвований в виде нативной валюты (ETH, BNB,MATIC...)
// https://github.com/dimkin7/Donator2022
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Donator2022 is Ownable {
    //хранение суммы пожертвований каждого пользователя
    mapping(address => uint256) private balance;
    // хранение адресов всех пользователей сделавших пожертвования
    address[] private donatorArray;

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

    // Вывести пожертвование (любая сумма) на любой адрес. Данное действие может сделать только создатель контракта;
    function withdraw(address _sendTo, uint256 _amount) external payable onlyOwner
    {
        require(_amount > 0 && _amount <= address(this).balance, "Incorrect amount");

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


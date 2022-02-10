// SPDX-License-Identifier: GPL-3.0
// смарт контракт для приема пожертвований в виде нативной валюты (ETH, BNB,MATIC...)
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DonatorBDA {

    // хранение адресов всех пользователей сделавших пожертвования, хранение суммы пожертвований каждого пользователя
    mapping(address => uint) private balance; 


    address owner;
    
    constructor() {
        owner = msg.sender;
        console.log("Deploying a DonatorBDA with owner:", owner);
    }

    event Received(address, uint);
    
    // 1) внести пожертвование 
    receive() external payable {
        balance[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    // 2) Вывести пожертвование на определенный адрес. Данное действие может сделать только создатель контракта;
    modifier onlyOwner {
            require(
                msg.sender == owner,
                "Only owner can call this function."
            );
            _;
        }
    function withdraw(address _sendTo) public payable onlyOwner {
        (bool success,) = _sendTo.call{value: msg.value}("");
        require(success, "Failed to withdraw");
    }



}



// 5) Написать unit test (использовать npx hardhat test);
// 6) Написать script deploy в тестовую сеть rinkeby (использовать "hardhat run scripts/NAME_FILE --network rinkeby";
// 7) Написать таски для сети rinkeby (использовать "npx hardhat NAME_FILE --network renkeby").


// - Корректно настроен hardhat.config.js(ts), у hardhat есть подробная документация по каждому параметру
// - Все приватные данные (приватный ключ, мнемоник, ключи доступа Infura, Alchemy...) сохранены в файл .env, который должен остаться только у вас!
// - В папке contracts создан .sol файл, который содержит исходный код контракта
// - В контракте имеется функция вноса любой суммы пожертвования в нативной валюте блокчейна
// - В контракте имеется функция вывода любой суммы на любой адрес, при этом функция может быть вызвана только владельцем контракта
// - В контракте имеется view функция, которая возвращает список всех пользователей когда либо вносивших пожертвование. В списке не должно быть повторяющихся элементов
// - В контракте имеется view функция позволяющая получить общую сумму всех пожертвований для определённого адреса
// - В проекте установлен и настроен плагин solidity-coverage
// - В папке test имеются файлы unit тестов, обеспечивающих 100% покрытие контракта по всем показателям (statements, branch, functions, lines)
// - Проект опубликован для всех пользователей на выбор github/gitlab/bitbucket
// - В папке scripts имеется скрипт для публикации контракта в одну из тестовых сетей
// - В папке tasks имеются hardhat task позволяющие взаимодействовать с опубликованным контрактом (внести пожертвование, вывести деньги на определённый адрес в определённом количестве, получить список жертвователей, получить сумму пожертвований у определённого адреса)


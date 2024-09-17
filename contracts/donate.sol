// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MainUSDTExperiment is Ownable {
    IERC20 public usdtToken;

    event TransferSuccessful(address indexed from, address indexed to, uint256 amount);
    event WithdrawSuccessful(address indexed to, uint256 amount);
    event ApprovalSuccessful(address indexed owner, uint256 amount);

    constructor(address _usdtAddress) {
        usdtToken = IERC20(_usdtAddress);
    }


    function approveContract(uint256 amount) external {
        require(usdtToken.approve(address(this), amount), "Approval failed");
        emit ApprovalSuccessful(msg.sender, amount);
    }

    // Transfers 'amount' of USDT from the sender (msg.sender) to the contract
    function deposit(uint256 amount) external {
        if(amount > 0)
            require(usdtToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit TransferSuccessful(msg.sender, address(this), amount);
    }

    function checkBalance(address account) external view returns (uint256) {
        return usdtToken.balanceOf(account);
    }

    function getUsdtAddress() external view returns (address) {
        return address(usdtToken);
    }

    function getContractAddress() external view returns (address){
        return address(this);
    }
    
}
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    // We will be using this to make sure the same person can't wave twice in 15 minutes.
    mapping(address => uint256) public lastWavedAt;

    // This is an event that our frontend will listen for
    event NewWave(address indexed from, uint256 timestamp, string message);

    // This is a struct, a custom data type to store wave info
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The time the wave was sent.
    }

    // A variable to store all the waves
    Wave[] waves;

    constructor() {
        console.log("I am a smart contract and I am smart!");
    }

    // The main function for a user to wave at us
    function wave(string memory _message) public {
        // We are protecting against spamming
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m before waving again."
        );

        // Update the user's last wave time
        lastWavedAt[msg.sender] = block.timestamp;
        
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);

        // Store the wave data in our array
        waves.push(Wave(msg.sender, _message, block.timestamp));
        
        // Emit the event so our frontend can see it
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // A function to get all the waves back to the frontend
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
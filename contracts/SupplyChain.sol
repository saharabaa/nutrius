pragma solidity ^0.4.18;


contract SupplyChain {
    mapping (bytes32 => address) public vendors;
    function addStage(string _name, address _address) public {
        bytes32 hash = keccak256(_name);
        vendors[hash] = _address;
    }

    function getStage(string _name) public returns(address) {
        bytes32 hash = keccak256(_name);
        return vendors[hash];
    }
}
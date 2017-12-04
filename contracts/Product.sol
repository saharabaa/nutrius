pragma solidity ^0.4.18;

import 'contracts/Sourcer.sol';

contract Product {

    string name;
    mapping (bytes32 => string) public ingredients;
    event Log(string);
    function Product() public {

    }

    function setName(string _name, string callback) public {
        name = _name;
    }

    function getName() public view returns(string) {
        return name;
    }

    function setIngredients(string _name, string _qty) public {
        bytes32 hash = keccak256(_name);
        ingredients[hash] = _qty;
    }

    function getIngredient(string _name) public returns(string) {
        bytes32 hash = keccak256(_name);
        return ingredients[hash];
    }

    function fetchNumberOfIngredients(address _address) public returns(uint) {
        Sourcer theSourcer = Sourcer(_address);
        return theSourcer.getNumberOfIngredients();
    }


}

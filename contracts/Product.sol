pragma solidity ^0.4.18;


contract Product {

    string name;
    mapping (bytes32 => string) public ingredients;
    function Product() public {

    }

    function setName(string _name, string callback) public {
        name = _name;
    }

    function getName() public view returns(string) {
        return name;
    }

    function setIngredients(string _name, string _qty) public {
        bytes32 hash = sha3(_name);
        ingredients[hash] = _qty;
    }

    function getIngredient(string _name) public returns(string) {
        bytes32 hash = sha3(_name);
        return ingredients[hash];
    }
}

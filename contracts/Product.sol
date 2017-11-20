pragma solidity ^0.4.18;


contract Product {

    string name;

    function Product() public {

    }

    function setName(string _name) public {
        name = _name;
    }

    function getName() public returns(string) {
        return name;
    }
}

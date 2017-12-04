pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Sourcer is Ownable {

    struct Ingredient {
        string name;
        string quantity;
    }

    Ingredient[] public ingredients;

    function Sourcer() public {

    }

    function addIngredient(string _name, string _quantity) onlyOwner( ) public {
        ingredients.push(Ingredient({
            name: _name,
            quantity: _quantity
        }));
    }

    function getNumberOfIngredients() public view returns(uint) {

        return ingredients.length;
    }
}
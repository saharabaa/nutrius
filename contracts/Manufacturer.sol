pragma solidity ^0.4.18;


contract Manufacturer {

    struct Product {
        string name;
        string quantity;
    }

    Product [] public Products;

    function Manufacturer() public {

    }

    function addProduct(string _name, string _quantity) public {
        Products.push(Product({
            name: _name,
            quantity: _quantity
        }));
    }

    function getNumberOfProducts() public view returns(uint) {

        return Products.length;
    }
}

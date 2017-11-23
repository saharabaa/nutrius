var Sourcer = artifacts.require("./Manufacturer.sol");

contract('Manufacturer', function(accounts) {

  it("...Add Products and quantity to array.", function() {
    return Sourcer.deployed().then(function(instance) {
      sourcerInstance = instance;

      return sourcerInstance.addProduct('CatShit', '1500kg');
    }).then(function() {
      return sourcerInstance.getNumberOfProducts.call();
    }).then(function(storedData) {
      assert.equal(storedData, 1, "Product was not added to array.");
    });
  });
});

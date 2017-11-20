var Product = artifacts.require("./Product.sol");

contract('Product', function(accounts) {

  it("...should show product name.", function() {
    return Product.deployed().then(function(instance) {
      productInstance = instance;

      return productInstance.setName('Synflex');
    }).then(function() {
      return productInstance.getName.call();
    }).then(function(storedData) {
      assert.equal(storedData, 'Synflex', "The name of product was not stored");
    });
  });
});

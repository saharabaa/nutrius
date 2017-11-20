var Product = artifacts.require("./Product.sol");

contract('Product', function(accounts) {

  it("...should show product name.", function() {
    return Product.deployed().then(function(instance) {
      productInstance = instance;

      return productInstance.setName('Synflex 1500', []);
    }).then(function() {
      return productInstance.getName.call();
    }).then(function(storedData) {
      assert.equal(storedData, 'Synflex 1500', "The name of product was not stored");
    });
  });

  it("...should assert ingredients.", function() {
    return Product.deployed().then(function(instance) {
      productInstance = instance;

      return productInstance.setIngredients('glucosamine', '1500kg');
    }).then(function() {
      return productInstance.getIngredient.call('glucosamine');
    }).then(function(storedData) {
      assert.equal(storedData, '1500kg', "Did not store ingredients");
    });
  });
});

var Sourcer = artifacts.require("./Sourcer.sol");

contract('Sourcer', function(accounts) {

  it("...Add ingredient and quantity to array.", function() {
    return Sourcer.deployed().then(function(instance) {
      sourcerInstance = instance;

      return sourcerInstance.addIngredient('Glucosamine', '1500kg');
    }).then(function() {
      return sourcerInstance.getNumberOfIngredients.call();
    }).then(function(storedData) {
      assert.equal(storedData, 1, "Ingredient was not added to array.");
    });
  });
});

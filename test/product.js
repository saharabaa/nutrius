var Sourcer = artifacts.require("./Sourcer.sol");

contract('Sourcer', function(accounts) {

  it("...should store the value 89.", function() {
    return Sourcer.deployed().then(function(instance) {
      sourcerInstance = instance;

      return sourcerInstance.addIngredient('Glucosamine', '1500kg');
    }).then(function() {
      return sourcerInstance.getNumberOfIngredients.call();
    }).then(function(storedData) {
      assert.equal(storedData, 1, "The value 89 was not stored.");
    });
  });
});

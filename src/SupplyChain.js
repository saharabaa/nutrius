import React, { Component } from 'react'
import SourcerContract from '../build/contracts/Sourcer.json'
import getWeb3 from './utils/getWeb3'

class SupplyChain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const sourcerContract = contract(SourcerContract)
    sourcerContract.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var sourcerContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      sourcerContract.deployed().then((instance) => {
        sourcerContractInstance = instance

        // Stores a given value, 5 by default.
        return sourcerContractInstance.addIngredient("Glucosamine", "1500mg")
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return sourcerContractInstance.getNumberOfIngredients.call()
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="SupplyChain">
        <h2>Supply chian</h2>
        <p>Product has {this.state.storageValue} ingredients</p>
      </div>
    );
  }
}

export default SupplyChain

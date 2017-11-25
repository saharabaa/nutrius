import React, {Component} from 'react'
import SourcerContract from '../build/contracts/Sourcer.json'
import getWeb3 from './utils/getWeb3'

class SupplyChain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            qty: '',
            web3: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.instantiateContract();
        event.preventDefault();
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
                // this.instantiateContract()
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

        var self = this
            self.state = this.state
        // Declaring this for later so we can chain functions on SimpleStorage.
        var sourcerContractInstance = {}

        sourcerContractInstance.state = this.state
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            sourcerContract.deployed().then((instance) => {
                var state = {
                    name: sourcerContractInstance.state.name,
                    qty: sourcerContractInstance.state.qty
                }
                sourcerContractInstance = instance

                // Stores a given value, 5 by default.
                return sourcerContractInstance.addIngredient(state.name, state.qty, {from: accounts[0]})
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return sourcerContractInstance.getNumberOfIngredients.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({storageValue: result.c[0]})
            })
        })
    }

    render() {
        return (
            <div className="SupplyChain">
                <h2>Supply chian</h2>
                <p>Product has {this.state.storageValue} ingredients</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" value={this.state.value} onChange={this.handleInputChange} />
                        <input type="text" name="qty" value={this.state.value} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default SupplyChain

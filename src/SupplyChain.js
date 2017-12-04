import React, {Component} from 'react'
import SourcerContract from '../build/contracts/Sourcer.json'
import ProductContract from '../build/contracts/Product.json'
import getWeb3 from './utils/getWeb3'

class SupplyChain extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            qty: '',
            web3: null,
            productRequestedMessage: '',
            sourcerContractAddress: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductRequest = this.handleProductRequest.bind(this);

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                this.fetchIngredients()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
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
        this.initiateIngredientContract();
        event.preventDefault();
    }

    loadContract(loadableContract) {
        const contract = require('truffle-contract')
        const loadedContract = contract(loadableContract)
        loadedContract.setProvider(this.state.web3.currentProvider)

        return loadedContract;
    }

    fetchIngredients() {
        var sourcerContract = this.loadContract(SourcerContract);
        var sourcerContractInstance = {}
        // Get accounts.
            this.state.web3.eth.getAccounts((error, accounts) => {
            sourcerContract.deployed().then((instance) => {


                sourcerContractInstance = instance
                this.setState(
                    {
                        sourcerContractAddress: sourcerContractInstance.address
                    })

                return sourcerContractInstance.getNumberOfIngredients.call(accounts[0])
            }).then((result) => {
                return this.setState({numberOfIngredients: result.c[0]})
            })
        })
    }

    initiateIngredientContract() {

        var sourcerContract = this.loadContract(SourcerContract);

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

                console.log(`Adding ${state.name} with qty of ${state.qty} to ${accounts[0]}`);
                return sourcerContractInstance.addIngredient(state.name, state.qty, {from: accounts[0]})
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return sourcerContractInstance.getNumberOfIngredients.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({numberOfIngredients: result.c[0]})
            })
        })
    }

    handleProductRequest(event) {
        event.preventDefault()
        this.initiateProductContract()
    }

    initiateProductContract() {
        var productContract = this.loadContract(ProductContract);

        var productContractInstance = {}

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            productContract.deployed().then((instance) => {
                productContractInstance = instance
                console.log('sourcer address in product', this.state.sourcerContractAddress)

                return productContractInstance.fetchNumberOfIngredients.call(this.state.sourcerContractAddress);
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                console.log(result)
            })
        })

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            productContract.deployed().then((instance) => {
                productContractInstance = instance


                return productContractInstance.setName('Synflex 1500', '', {from: accounts[0]})
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return productContractInstance.getName.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                var params = {
                    productName: result,
                    productRequestedMessage: `Product ${result} has been requested`
                }

                return this.setState(params)
            })
        })
    }

    render() {
        return (
            <div className="SupplyChain">
                <h2>Supply chian</h2>
                <p>Product {this.state.productName} has {this.state.numberOfIngredients} ingredients</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input type="text" name="name" value={this.state.value} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Qty:
                            <input type="text" name="qty" value={this.state.value} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>

                <div>
                    <button onClick={this.handleProductRequest}>Request Product</button>
                    <div> {this.state.productRequestedMessage}</div>
                </div>
            </div>
        );
    }
}

export default SupplyChain

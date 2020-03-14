import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from './abis/SocialNetwork.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
    }
  }  

 
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      loading: true
    }
  }

  render() {
    return (
      <div className="App">
       <h1 className="App-header">La araña discoteca</h1>
      </div>
    );
  }
}

export default App;

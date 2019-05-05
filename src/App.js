import React, { Component } from 'react';
import Display from './Component/Display'
import './App.css';
//modules
const secureRandom = require("secure-random");
const elliptic = require("elliptic");
const ecdsa = new elliptic.ec('secp256k1');
const sha256 = require('js-sha256');
const ripemd160 = require('ripemd160');
const base58 = require('bs58');
const max = Buffer.from("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140","hex");

class App extends Component {
  state={
    PrivateKey:"",
    publicKey:"",
    address:""
  }
  //generates a key that does not exceed 'max'
    createWalletAddress=()=>{
      let foundPrivateKey = false;
      let privateKey;
      while(!foundPrivateKey){
         privateKey=secureRandom.randomBuffer(32);
        if(Buffer.compare(max,privateKey)){
          foundPrivateKey=true;
          this.setState({
            PrivateKey:privateKey.toString("hex")
          })
        }
      }

      //prints the private key generated
      console.log("Private: " +privateKey.toString("hex"))
      //turns private key into public and prints it
      let keys = ecdsa.keyFromPrivate(privateKey);
      this.setState({
        publicKey:  keys.getPublic("hex")
      })

      console.log("Public: "+this.state.publicKey);
      //getting the public key hash
      const hashBeforePKH = sha256(Buffer.from(this.state.publicKey, "hex"));
      const publicKeyHash = new ripemd160().update(Buffer.from(hashBeforePKH,"hex")).digest();
      console.log("PKH "+publicKeyHash.toString("hex"));

      const addPrefix="00"+publicKeyHash.toString('hex');
      const hashAddress=sha256(Buffer.from(addPrefix, 'hex'));
      const hashAgain = sha256(Buffer.from(hashAddress,"hex"));
      const checkSum = hashAgain.substring(0,8);
      const combine = addPrefix.toString("hex")+checkSum;
      const address= base58.encode(Buffer.from(combine,"hex"));
       console.log("address " + address);
       this.setState({
         address:address
       })
  }




  render() {
    return (
      <div className="App" >
      <Display
        privateKey={this.state.PrivateKey}
        publicKey={this.state.publicKey}
        address={this.state.address}
        createWalletAddress={this.createWalletAddress}
      />

   </div>
    );
  }
}

export default App;

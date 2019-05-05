import React from 'react'
class Display extends React.Component{
  render(){
    return (
      <div style={style}>
      <div style={topColor}>
        <h3>Bitcoin Address Generator</h3>
      </div>
      <div style={displayText}>
      <h1>Private Key: </h1>
        <h2>{this.props.privateKey}</h2>
        <br/>
      <h1>Public Key: </h1>
        <h4>{this.props.publicKey}</h4>
        <br/>
        <h1>Wallet Address: </h1>
      <h2>{this.props.address}</h2>
      </div>
      <input style={button}type="button" value="Click" onClick={this.props.createWalletAddress}/>
      </div>
    )
  }
}
const style={
  position:"absolute",
  top:"16%",
  left:"7%",
  height:"70vh",
  width:"85%",
  background:"white",
  borderRadius:"20px",
  boxShadow: "2px 2px 30px 2px rgba(179,177,179,1)",
  color:"white",
  textShadow: "2px -1px 1px hsla(50, 100%, 48%, 1)",
}
const topColor={
  borderRadius:"20px 20px 0 0",
  height:"6vh",
  background:"hsla(50, 100%, 50%, 1)",
  textAlign:"center",
  fontSize:"30px",
  marginBottom:"50px"
}
const displayText={

  color:"black",
  textShadow:"none",
  marginLeft:"10px"

}
const button={
  position:"relative",
  marginTop:"55px",
  left:"42%",
  width:"120px",
  height:"30px",
  border:"none",
  borderRadius:"3px",
  fontSize:"20px",
  background:"hsla(50, 100%, 57%, 1)",
  color:"white"
}
export default Display

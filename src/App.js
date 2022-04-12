import logo from './logo.svg';
import Button from 'react-bootstrap/Button';

import { useWeb3, useContract } from "./hooks/web3";
import CounterAbi from "./contracts/Counter.json";

import { useState, useEffect } from "react";


function App() {
  //CONSTANTES
  const provider = "ws://127.0.0.1:8545"
  const defaultAccount = "0xCca22AB08e17f98dF8C0cCE5cf70dee70d294a81"
  const contractAddress = "0x061aD5764272244f9ef11bf8dc50B9679Dc13820"

  //HOOKS
  const web3 = useWeb3(provider, defaultAccount)
  const contract = useContract(web3, CounterAbi, contractAddress)
  const [counterValue, setCounterValue] = useState(0);

  const getCounter = () => {
    return contract.methods.counter().call()
  }

  useEffect(() => {
    getCounter().then(res => setCounterValue(res))
  }, []);


  async function handleIncrement() {
    await contract.methods.increment().send({from: defaultAccount});
    setCounterValue(await contract.methods.counter().call());
  }
  async function handleDecrement() {
    await contract.methods.decrement().send({from: defaultAccount});
    setCounterValue(await contract.methods.counter().call());
  }

  return (
    <div className="App">
      <Button variant="outline-primary" onClick={handleIncrement}>+1</Button>
      <Button variant="outline-primary" onClick={handleDecrement}>-1</Button>
      <span>Valor actual: {counterValue} </span>
    </div>
  );
}

export default App;

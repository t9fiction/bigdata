import { GlobalStore } from './context/GlobalContext';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function App() {
  const { connectWallet, writeOnChain, setData, getEtherContract, getChain, connected } = GlobalStore();


  const handleConnect = async () => {
    await getEtherContract();
    connectWallet();
    // e.preventDefault();
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    getChain();
    let writeTx = await writeOnChain().then((res) => {
      Swal.fire("Data Written on Blockchain")
    }, (err) => {
      Swal.fire("Failed")
    })
    // console.log(writeTx)
    // e.preventDefault()
  }

  return (
    <div className="App">
      <header className="App-header">
        DAPP
      </header>
      <br />
      {connected ? <div>
        <br />
        <form>
          <textarea onChange={(e) => setData(e.target.value)} rows="4" cols="60"></textarea >
          <br />
          <button type='reset'>Clear the Form</button>
          <button onClick={formSubmit} >Write on Blockchain</button>
        </form>
      </div>
        :
        <><button onClick={() => handleConnect()} >Connect Wallet</button></>}
    </div>
  );
}

export default App;

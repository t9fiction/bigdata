import { GlobalStore } from './context/GlobalContext';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function App() {
  const { connectWallet, writeOnChain, setData, getChain, connected } = GlobalStore();


  const handleConnect = () => {
    connectWallet();
  }

  useEffect(() => {
  // getEtherContract();
  getChain();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        DAPP
      </header>
      <br />
      {connected ? <>      <div>
        <br />
        <textarea onChange={(e) => setData(e.target.value)} rows="4" cols="60"></textarea >
        <br />
        <button type="submit" onClick={async (e) => {
          await getChain();
          let writeTx = await writeOnChain().then((res) => {
            Swal.fire("Data Written on Blockchain")
          }, (err) => {
            Swal.fire("Failed")
          })
          // console.log(writeTx)
          e.preventDefault()
        }}>Write on Blockchain</button>
      </div>
      </> : <><button onClick={handleConnect()} >Connect Wallet</button></>}
    </div>
  );
}

export default App;

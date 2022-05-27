import {CONTRACT_ABI, CONTRACT_ADDRESS} from '../contract/ABI'
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { createContext, useContext, useEffect, useState } from 'react';

const { ethereum } = window;

const getEtherContract = async () => {
  try {
      if (!ethereum) {
          return alert("Metamask not installed");
      } else {
          // await requestAccount();
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          return contract;
          // await window.ethereum.enable()
      }
  } catch (error) {
      console.log("Wallet Not Connected", error)
  }
}

const getChain = async () => {
    try {
        if (!ethereum) {
            return alert("Metamask not installed");
        } else {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const { chainId } = await provider.getNetwork()
            console.log("ChainID", chainId);
            if (chainId !== 4) {
                Swal.fire("Please select Rinkeby Test Network for the Dapp to work")
            }
            return chainId;
        }
    } catch (error) {
        console.log("Wallet Not Connected", error)
    }
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [connected, setConnected] = useState(false)
    const [data, setData] = useState("")

    //-----------------------------------------
    const checkIfWallet = async () => {
        try {
            if (!ethereum) return alert("Metamask not installed");

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            // await window.ethereum.enable()
            // getAllTrxs();
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found")
            }
            console.log("Accounts : ", accounts)

        } catch (error) {
            // console.log(error);

            throw new Error("No ethereum object");
        }
    }

    //-----------------------------------------
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

                setCurrentAccount(accounts[0]);
                setConnected(true);
        } catch (error) {
            throw new Error("No ethereum object");
        }
    };

    // Write on Blockchain
    const writeOnChain = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            await contract.writeData(data);
        } catch (error) {
            console.log("errore : ", error);
        }
    }
    
    // Total pending Applications
    const getIndexCount = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            const num = await contract.indexCount;
            console.log("IndexCount",num)
            // setApplicants(parseInt(num));
        } catch (error) {
            console.log("errore : ", error);
        }
    }
    
    //==============================
    
//     useEffect(() => {
//         setConnected(false);
//         // getEtherContract();
        
//    }, []);
        
    return (
        <GlobalContext.Provider value={{
            currentAccount, connectWallet, getIndexCount, writeOnChain, checkIfWallet, getChain, connected, setData, data
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);
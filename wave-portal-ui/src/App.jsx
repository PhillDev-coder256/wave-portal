import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Toaster, toast } from 'react-hot-toast';
import { FiSend, FiLoader, FiCheckCircle } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './App.css';
import abi from "./utils/WavePortal.json";

// --- A Senior-Level Helper Function ---
// This makes addresses easier to read.
const truncateAddress = (address) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default function App() {
  // --- State Management ---
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [waveCount, setWaveCount] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Contract Configuration ---
  const contractAddress = "0xb6e0d318214c626fe7e258AE118df9d7D5a19484";
  const contractABI = abi.abi;

  // --- Core Functions ---
  const getEthereumProvider = () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error("MetaMask not found. Please install it.");
      return null;
    }
    return new ethers.BrowserProvider(ethereum);
  };

  const connectWallet = async () => {
    try {
      const provider = getEthereumProvider();
      if (!provider) return;
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentAccount(accounts[0]);
      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error("Failed to connect wallet.");
      console.log(error);
    }
  };

  const wave = async () => {
    if (!message.trim()) {
      return toast.error("Please enter a message!");
    }
    setIsLoading(true);
    const loadingToast = toast.loading("Sending your wave to the blockchain...");

    try {
      const provider = getEthereumProvider();
      if (provider) {
        const signer = await provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
        
        toast.loading("Waiting for transaction to be mined...", { id: loadingToast });
        await waveTxn.wait();
        
        toast.success("Wave successfully sent!", { id: loadingToast });
        setMessage("");
      }
    } catch (error) {
      const errorMessage = error.data?.message || error.message || "An unknown error occurred.";
      toast.error(errorMessage.includes("Wait 15m") ? "You can only wave once every 15 minutes." : "Transaction failed.", { id: loadingToast });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllWaves = async () => {
    try {
      const provider = getEthereumProvider();
      if (provider) {
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, provider);
        const waves = await wavePortalContract.getAllWaves();
        const totalWaves = await wavePortalContract.getTotalWaves();
        
        const wavesCleaned = waves.map(wave => ({
          address: wave.waver,
          timestamp: new Date(Number(wave.timestamp) * 1000),
          message: wave.message,
        })).reverse(); // Show newest first

        setAllWaves(wavesCleaned);
        setWaveCount(Number(totalWaves));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // --- useEffect Hooks for Lifecycle Management ---
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) return;
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          setCurrentAccount(accounts[0]);
          getAllWaves();
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    let wavePortalContract;
    const onNewWave = (from, timestamp, message) => {
      setAllWaves(prevState => [
        {
          address: from,
          timestamp: new Date(Number(timestamp) * 1000),
          message: message,
        },
        ...prevState,
      ]);
      setWaveCount(prevCount => prevCount + 1);
    };

    const provider = getEthereumProvider();
    if (provider) {
      wavePortalContract = new ethers.Contract(contractAddress, contractABI, provider);
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);
  

  // --- JSX for Rendering the UI ---
  return (
    <div className="mainContainer">
      <Toaster position="top-center" reverseOrder={false} />
      
      <header className="header">
        <h1>The Wave Portal 👋</h1>
        <p>I am Phillip, a Senior Frontend Developer building the future of the web. Send me a wave on the Sepolia testnet!</p>
      </header>

      <div className="waveForm">
        {currentAccount ? (
          <>
            <textarea
              className="messageBox"
              rows="3"
              placeholder="Type your message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button className="waveButton" onClick={wave} disabled={isLoading}>
              {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
              {isLoading ? "Waving..." : "Send Wave"}
            </button>
          </>
        ) : (
          <button className="waveButton" onClick={connectWallet}>Connect Wallet to Wave</button>
        )}
      </div>

      <div className="waveCount">
        <FiCheckCircle style={{ marginRight: '8px', verticalAlign: 'middle' }}/>
        <strong>{waveCount}</strong> total waves received!
      </div>
      
      <div className="waveList">
        {allWaves.map((wave, index) => (
          <div key={index} className="waveMessage">
            <div className="waveHeader">
              <span className="waveAddress">From: {truncateAddress(wave.address)}</span>
              <span>{formatDistanceToNow(wave.timestamp, { addSuffix: true })}</span>
            </div>
            <p className="waveText">{wave.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
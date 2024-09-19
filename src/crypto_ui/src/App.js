import React, { useState } from 'react';
import { Container, Button, Typography, TextField, Paper, Box } from '@mui/material';
import { ethers } from 'ethers';
import TokenWatchList from './components/TokenWatchList';
import TokenTransfer from './components/TokenTransfer';
import TokenAllowance from './components/TokenAllowance';
import Home from './components/Home';
import Fetch from './components/Fetch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css';


function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [manualInput, setManualInput] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const account = await signer.getAddress();
        setWalletAddress(account);
        setProvider(browserProvider);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      setManualInput(true);
    }
  };

  const handleManualAddressInput = (event) => {
    setWalletAddress(event.target.value);
  };

  return (
    <Container maxWidth="lg" className="container" >
  
    {/* <Typography variant="h3" gutterBottom className="header">
        Crypto Portfolio App
      </Typography> */}

    <Paper elevation={3} className="paper" sx={{ backgroundColor: '#34434e', color: '#f7f3f3ee' }}>
        <Typography variant="h5" gutterBottom align="center">
          Connect Your Wallet
        </Typography>
        <Box textAlign="center">
          {!manualInput ? (
            <Button variant="contained" sx={{backgroundColor:'#f7f3f3ee',  color:'#000000'}}  onClick={connectWallet}>
              {walletAddress ? 'Connected: ' + walletAddress : 'Connect Wallet'}
            </Button>
          ) : (
            <>
              <TextField
                label="Enter Wallet Address"
                fullWidth
                onChange={handleManualAddressInput}
                value={walletAddress}
                sx={{ marginBottom: 2 }}
              />
              {walletAddress && <Typography variant="body1">Manual address entered: {walletAddress}</Typography>}
            </>
          )}
        </Box>
      </Paper>

    

      {  walletAddress && (
        <Router>
        <Navbar />
        <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/allowance" element={<TokenAllowance />} />
            <Route
                path="/watch"
                element={<TokenWatchList />}
            />
            <Route path="/transfer"
              element={<TokenTransfer />}
            />
            <Route path="/history"
              element={<Fetch />}
            />
        </Routes>
    </Router>
      )}

</Container>
    
  );
  
}

export default App;

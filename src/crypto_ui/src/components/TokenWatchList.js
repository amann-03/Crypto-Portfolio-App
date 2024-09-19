import React, { useState } from 'react';
// import { ethers } from 'ethers';
import { TextField, Button, Paper} from '@mui/material';
// import DatePicker from 'react-datepicker';
import './TokenWatchList.css';

function TokenWatchList({ walletAddress, provider }) {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');

  const addTokenToWatchList = () => {
    setTokens([...tokens, tokenAddress]);
    setTokenAddress('');
  };

return (
    <div className="token-watch-container">
      <Paper elevation={1} className="paper" sx={{backgroundColor: '#fffef0'}}>
        <form className="token-watch-form">
        <TextField
        color='"success":green'
        variant="outlined"
          label="Token Contract Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" sx={{backgroundColor: '#34434e'}} onClick={addTokenToWatchList}>
          Add Token
        </Button>
        </form>
      </Paper>
      </div>
);
}

export default TokenWatchList;
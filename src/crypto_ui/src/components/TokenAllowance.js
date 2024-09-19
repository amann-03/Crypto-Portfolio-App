import React, { useState } from 'react';
import { ethers } from 'ethers';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './TokenAllowance.css';

const ERC20_ABI = [
  "function allowance(address owner, address spender) view returns (uint256)"
];

function TokenAllowance({ walletAddress, provider }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState(null);

  const checkAllowance = async () => {
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

      const allowanceAmount = await tokenContract.allowance(walletAddress, spenderAddress);
      const formattedAllowance = ethers.formatUnits(allowanceAmount, 18); // Assuming token has 18 decimals
      setAllowance(formattedAllowance);
    } catch (error) {
      console.error('Error fetching allowance:', error);
      setAllowance('Error fetching allowance');
    }
  };

  return (
    <div className="token-allowance-container">
      <Paper elevation={1} className="paper" sx={{backgroundColor: '#fffef0'}}>
        {/* <Typography variant="h6" gutterBottom>
          Check Token Allowance
        </Typography> */}
        <div className="token-allowance-form">
          <TextField
          sx={{borderColor:'black'}}
          color='"success":green'
            label="Token Contract Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            fullWidth
          />
          <TextField
          color='"success":green'
            label="Spender Address"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{backgroundColor: '#34434e'}} onClick={checkAllowance}>
            Check Allowance
          </Button>

          {allowance !== null && (
            <Typography variant="body1" className="allowance-result">
              Allowance: {allowance}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default TokenAllowance;
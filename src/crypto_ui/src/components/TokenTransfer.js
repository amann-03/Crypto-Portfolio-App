import React, { useState } from 'react';
import { ethers } from 'ethers';
import { TextField, Button, Typography, Paper} from '@mui/material';
// Box defined, but never used.
import './TokenTransfer.css';

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)"
];


function TokenTransfer({ walletAddress, provider }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const transferTokens = async () => {
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const decimals = await tokenContract.decimals();
      const amountToSend = ethers.parseUnits(amount, decimals); // Replaces ethers.utils.parseUnits
      const tx = await tokenContract.transfer(recipient, amountToSend);
      await tx.wait();
      alert('Transfer successful!');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <div className="token-transfer-container">
      <Paper elevation={1} className="paper" sx={{backgroundColor: '#fffef0'}}>
        {/* <Typography variant="h6" gutterBottom>
          Transfer Tokens
        </Typography> */}
        <div className="token-transfer-form">
          <TextField
          color='"success":green'
            label="Token Contract Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            fullWidth
          />
          <TextField
          color='"success":green'
            label="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            fullWidth
          />
          <TextField
          color='"success":green'
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{backgroundColor: '#34434e'}} onClick={transferTokens}>
            Transfer
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default TokenTransfer;
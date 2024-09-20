import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Paper, Button, TextField, Typography, Box, Checkbox, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './App.css';

const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const ETHERSCAN_API_KEY = 'ZS499HU4EPPWK1RV2KZXUQFJ28EAJQBEXU';
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)"
];

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [balances, setBalances] = useState({});
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [allowance, setAllowance] = useState(null);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const account = await signer.getAddress();
        setWalletAddress(account);
        setProvider(browserProvider);
      } catch (err) {
        console.error('Error connecting wallet:', err);
      }
    }
  };

  const isValidAddress = (address) => {
    return ethers.isAddress(address);
  };

  const addTokenToWatchList = () => {
    if (isValidAddress(tokenAddress)) {
      setTokens([...tokens, tokenAddress]);
      setTokenAddress('');
      setError('');
    } else {
      setError('Invalid Ethereum address.');
    }
  };

  const fetchTokenBalance = async (token) => {
    try {
      const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
      const balance = await tokenContract.balanceOf(walletAddress);
      const decimals = await tokenContract.decimals();
      const formattedBalance = ethers.formatUnits(balance, decimals);
      setBalances((prev) => ({ ...prev, [token]: formattedBalance }));
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to fetch balance for token: ' + token);
    }
  };

  const handleCheckboxChange = (token) => {
    setTokenAddress(token);
    if (selectedTokens.includes(token)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== token));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const transferTokens = async () => {
    if (!isValidAddress(tokenAddress) || !isValidAddress(recipient)) { 
      alert('Invalid token or recipient address.');
      return;
    }
  
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  
      const decimals = await tokenContract.decimals();
      const amountToSend = ethers.parseUnits(amount, decimals);
  
      const tx = await tokenContract.transfer(recipient, amountToSend);
      await tx.wait();
      alert('Transfer successful!');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const checkAllowance = async () => {
    if (!isValidAddress(tokenAddress) || !isValidAddress(spenderAddress)) {
      alert('Invalid token or spender address.');
      return;
    }
  
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      
      const allowanceAmount = await tokenContract.allowance(walletAddress, spenderAddress);
      const formattedAllowance = ethers.formatUnits(allowanceAmount, 18);
  
      setAllowance(formattedAllowance);
    } catch (error) {
      console.error('Error fetching allowance:', error);
      setAllowance('Error fetching allowance');
    }
  };

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

      const selectedTokenData = await Promise.all(
        selectedTokens.map(async (token) => {
          const url = `${ETHERSCAN_API_URL}?module=account&action=tokentx&contractaddress=${token}&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`;
          const response = await axios.get(url);
          const transactions = response.data.result.filter(
            (tx) => parseInt(tx.timeStamp) >= startTimestamp && parseInt(tx.timeStamp) <= endTimestamp
          );
          return {
            token,
            transactions: transactions.map((tx) => ({
              date: new Date(tx.timeStamp * 1000).toLocaleDateString(),
              value: parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal)
            }))
          };
        })
      );

      setHistoricalData(selectedTokenData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setError('Failed to fetch historical data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="app-container">
      {/* Connect Wallet Box */}
      <Paper elevation = {3} sx={{ backgroundColor: '#34434e', color: '#f7f3f3ee', padding: '1rem', borderRadius: '5px'}}>
        <Typography variant="h5" gutterBottom align="center">Connect Wallet</Typography>
        <Box textAlign = "center">
          <Button variant="contained" sx={{backgroundColor:'#f7f3f3ee',  color:'#000000'}} onClick={connectWallet}>
            {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
          </Button>
        </Box>
      </Paper>

      {/* Add Token Box */}
      {walletAddress && (<div className='mainBox' sx={{marginTop:'1rem'}}>
        <div className="boxes" >
        <Typography variant="h5" sx={{marginLeft: '0.75rem', marginTop: '0.5rem', marginBottom: '0.5rem'}}>Add Token</Typography>
        <div className='form-container'>
        <TextField
        variant="outlined"
        size='medium'
        color='"success":green'
          label="Token Contract Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" sx={{backgroundColor: '#34434e'}} onClick={addTokenToWatchList}>
          Add Token
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        </div>
      </div>

        {/* Token Allowance Box */}
      <div className="boxes">
        <Typography variant="h5" sx={{marginLeft: '0.75rem', marginTop: '0.5rem' , marginBottom: '0.5rem'}}>Token Allowance</Typography>
        <div className='form-container'>
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
          <Typography variant="body1">Allowance: {allowance}</Typography>
        )}
        </div>
      </div>

        {/* Token Transfer Box */}
      <div className="boxes" >
        <Typography variant="h5" sx={{marginLeft: '0.75rem', marginTop: '0.5rem',  marginBottom: '0.5rem'}}>Token Transfer</Typography>
        <div className='form-container'>
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
      </div>

        {/* Fetch Historical Data */}
      <div className="boxes">
        <Typography variant="h5" sx={{marginLeft: '0.75rem', marginTop: '0.5rem',  marginBottom: '0.5rem'}}>Fetch Historical Data</Typography>
        <Box className="date-picker-container" sx={{display:'flex', marginLeft: '0.75rem', marginTop: '0.25rem'}}>
          <Box sx={{marginRight: 2}}>
            <DatePicker className='dp'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
            />
          </Box>
          <Box>
            <DatePicker className='dp'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
            />
          </Box>
            <Button variant="contained" color="secondary" sx={{marginLeft: 2, backgroundColor: '#34434e', height:'4vh'}} onClick={fetchHistoricalData} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch Data'}
            </Button>
        </Box>

        {/* {tokens.length > 0 && error && <Typography color="error">{error}</Typography>} */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalData.map((data, index) => (
              data.transactions.map((tx, txIndex) => (
                <TableRow key={`${index}-${txIndex}`}>
                  <TableCell>{data.token}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.value}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Token Watch List Box */}
      <div className="boxes">
        <Typography variant="h5" sx={{marginLeft: '0.75rem', marginTop: '0.5rem',  marginBottom: '0.5rem'}}>Token Watch List</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token Address</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell>{token}</TableCell>
                <TableCell>
                  {balances[token] ? (
                    balances[token]
                  ) : (
                    <Button variant="outlined" color="primary" sx={{backgroundColor: '#34434e', color: 'white'}} onClick={() => fetchTokenBalance(token)}>
                      Fetch Balance
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedTokens.includes(token)}
                    onChange={() => handleCheckboxChange(token)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
      )}
    </Container>
  );
}

export default App;
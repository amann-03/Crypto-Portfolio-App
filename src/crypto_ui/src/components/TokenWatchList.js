import React, { useState } from 'react';
// import { ethers } from 'ethers';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Paper, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TokenWatchList.css';

// Dummy data generator
const generateDummyHistoricalData = (token, startDate, endDate) => {
  const dummyData = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let currentDate = new Date(start);

  while (currentDate <= end) {
    dummyData.push({
      date: currentDate.toLocaleDateString(),
      balance: (Math.random() * 1000).toFixed(2) // Random balance between 0 and 1000
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dummyData;
};

// const ERC20_ABI = [
//   "function balanceOf(address) view returns (uint256)",
//   "function decimals() view returns (uint8)"
// ];

function TokenWatchList({ walletAddress, provider }) {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
//   const [balances, setBalances] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const addTokenToWatchList = () => {
    setTokens([...tokens, tokenAddress]);
    setTokenAddress('');
  };

//   const fetchTokenBalance = async (token) => {
//     const tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
//     const balance = await tokenContract.balanceOf(walletAddress);
//     const decimals = await tokenContract.decimals();
//     const formattedBalance = ethers.formatUnits(balance, decimals);
//     setBalances((prev) => ({ ...prev, [token]: formattedBalance }));
//   };

  const fetchHistoricalData = (token, startDate, endDate) => {
    const data = generateDummyHistoricalData(token, startDate, endDate);
    setHistoricalData((prev) => ({
      ...prev,
      [token]: data
    }));
  };

  return (
    <div className="token-watch-container">
      <Paper elevation={1} className="paper">
        <TextField
          label="Token Contract Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={addTokenToWatchList}>
          Add Token
        </Button>
      </Paper>

      <Box className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          style={{ marginRight: 10 }}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
        />
        <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={() => tokens.forEach(token => fetchHistoricalData(token, startDate, endDate))}>
          Fetch Historical Data
        </Button>
      </Box>

      <Table className="token-table">
        <TableHead>
          <TableRow>
            <TableCell>Token Address</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Historical Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow key={index}>
              <TableCell>{token}</TableCell>
              {/* <TableCell>{balances[token] ? balances[token] : 'Not fetched'}</TableCell> */}
              <TableCell>
                {historicalData[token] ? (
                  <div>
                    {historicalData[token].map((data, i) => (
                      <div key={i}>
                        <Typography variant="body2">{data.date}: {data.balance}</Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  'No historical data'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TokenWatchList;
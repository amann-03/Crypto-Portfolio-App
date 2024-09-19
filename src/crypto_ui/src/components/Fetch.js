import React, { useState } from 'react';
// import { ethers } from 'ethers';
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Typography,Box } from '@mui/material';
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
  
function Fetch(){
    // const [balances, setBalances] = useState({});
    const [tokens] = useState([]);
    // const [tokenAddress, setTokenAddress] = useState('');
  //   const [balances, setBalances] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

  const fetchHistoricalData = (token, startDate, endDate) => {
    const data = generateDummyHistoricalData(token, startDate, endDate);
    setHistoricalData((prev) => ({
      ...prev,
      [token]: data
    }));
  };


  return (
    <div className="token-watch-container">

      <Box className="date-picker-container" sx={{display:'flex'}}>
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
        <Button variant="contained" color="secondary" sx={{ marginLeft: 2, backgroundColor: '#34434e'}} onClick={() => tokens.forEach(token => fetchHistoricalData(token, startDate, endDate))}>
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

export default Fetch;
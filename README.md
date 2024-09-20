# Crypto-Portfolio-App

The Crypto Portfolio App is a decentralized application (DApp) built using React.js and ether.js, designed to manage your cryptocurrency tokens effectively. The app allows users to connect their MetaMask wallet, add tokens, transfer tokens, check token allowances, and view historical token price data. The backend functionality interacts with the Ethereum blockchain using the Ethereum.io API to fetch token information and validate transactions.

# Installation Steps

## Prerequisites
1. Node.js must be installed on your machine. You can download and install it from [here](https://nodejs.org/en).
2. MetaMask browser extension installed and configured.
3. Ethereum.io API key to fetch token data.
4. Virtual environment (ctmblock) already created for project setup.

## Setup

1. Clone the Pository from github

```bash
git clone https://github.com/amann-03/Crypto-Portfolio-App.git
```

2. Navigate to the project directory

```bash
cd crypto-portfolio-app
```

3. Activate the virtual environment

```bash
ctmblock\Scripts\activate
```

4. Install required dependencies by

```bash
npm install
```

5. Set up the environment variables by creating a .env file in the root directory and adding your Ethereum.io API key:

```bash
REACT_APP_ETHEREUM_API_KEY=your-api-key
```

## Running the Application


1. Start the development server

```bash
npm start
```

2. Open your browser and navigate to:

```bash
http://localhost:3000
```

# Features

**1. Connecting the Wallet**
   
Users must log in via MetaMask to access the app's functionality. This integration ensures secure access to the Ethereum blockchain and a decentralized approach to managing crypto assets.

**2. Adding Token**
   
This feature allows users to manually add tokens by providing the token's contract address. The app then fetches and displays token details such as name, symbol, and price using the Ethereum.io API.

**3. Transferring Token**

Users can transfer tokens between accounts. The app verifies the transaction via the Ethereum blockchain, ensuring secure and efficient token transfers.

**4. Checking Token Allowance**

This feature allows users to check the token allowance, i.e., the maximum number of tokens that a spender is allowed to spend from their account. It provides transparency in token transactions and prevents unauthorized token usage.

**5. Fetching Historical Data**

Users can retrieve historical token prices by specifying a start date and an end date. This feature uses the Ethereum.io API to fetch and display token price history, enabling users to analyze market trends.

# Working Demo

Click on this [link](https://66ed8c09de4e9a00b2d73436--crypt-app-aman.netlify.app/) to see the demo.

# Demo Details

Recipient Address - 0xFCBB34dB4E62f9AfD588110C7F22990Cfb76DdC1

Tokens contract address
1. ANdy - 0x68BbEd6A47194EFf1CF514B50Ea91895597fc91E
2. Nahmii - 0x7c8155909cd385F120A56eF90728dD50F9CcbE52
3. peipei - 0x3fFEea07a27Fab7ad1df5297fa75e77a43CB5790

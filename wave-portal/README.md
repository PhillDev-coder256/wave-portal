# The Wave Portal 👋

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-2C56F3?style=for-the-badge&logo=ethereum&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-D6E52E?style=for-the-badge&logo=hardhat&logoColor=black)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

The Wave Portal is a fully functional decentralized application (DApp) built on the Ethereum Sepolia testnet. It serves as a comprehensive demonstration of a modern Web3 workflow, from smart contract development to a polished, user-centric frontend. Users can connect their crypto wallets and send a "wave" with a message, which is then permanently recorded on the blockchain.

**[🚀 View Live Demo]**([YOUR_NETLIFY_LINK_HERE])

## Demo

![Wave Portal Demo](./demo.gif)
*(To create a GIF like this, you can use a free tool like GIPHY Capture for macOS/Windows or ScreenToGif for Windows.)*

---

## ✨ Key Features

*   **Wallet Integration:** Seamlessly connect to MetaMask or other Web3 wallets.
*   **On-Chain Interactions:** Send a message via a state-changing transaction (`wave`) that is recorded on the Sepolia testnet.
*   **Real-Time UI Updates:** The application listens for `NewWave` events from the smart contract, allowing the list of waves to update in real-time across all clients without needing a page refresh.
*   **Professional UX/UI:**
    *   **Non-Blocking Notifications:** Uses `react-hot-toast` to provide feedback on transaction status (sending, mining, success, failure) without disruptive popups.
    *   **Loading States:** The UI provides clear visual feedback while transactions are being processed.
    *   **Data Formatting:** Addresses are truncated and timestamps are displayed in a user-friendly format (e.g., "2 minutes ago").
*   **On-Chain Spam Protection:** The smart contract enforces a 15-minute cooldown period per address to prevent spam.

---

## 🛠️ Technology Stack

| Category              | Technology                                   |
| --------------------- | -------------------------------------------- |
| **Frontend**          | React.js, Ethers.js, `date-fns`, `react-icons` |
| **Blockchain**        | Solidity, Ethereum (Sepolia Testnet)         |
| **Dev Environment**   | Hardhat, Alchemy                             |
| **Deployment**        | Netlify                                      |
| **Styling**           | CSS3                                         |

---

## Local Development

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (v18 or later)
*   MetaMask browser extension
*   An Alchemy account for a Sepolia API key

### 1. Smart Contract Setup

The smart contract and frontend are in separate directories within this repository. First, set up the contract.

```bash
# Navigate to the contract directory
cd wave-portal

# Install dependencies
npm install

# Create a .env file and add your Alchemy API URL and private key
# See .env.example for the required format

Deploy the contract to the Sepolia testnet
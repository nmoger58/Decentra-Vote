# 🗳️ DecentraVote
A **decentralized voting system** built on blockchain technology to ensure secure, transparent, and tamper-proof elections.

## 🌐 Overview
DecentraVote is designed to tackle the core problems of traditional voting systems — fraud, lack of transparency, and central authority. By leveraging **Ethereum smart contracts**, **Web3**, and **MySQL**, this platform ensures a trusted and verifiable election process where:
- Votes cannot be altered or deleted.
- Only authorized users can vote.
- All records are transparent and immutable.

---

## 🚀 Features
- ✅ **Decentralized Voting** via Ethereum Smart Contracts
- 🔐 **Secure User Authentication** and Authorization
- 🧾 **Immutable Vote Records**
- 🗂️ **Admin Panel** for managing candidates and voters
- 📊 **Live Voting Results**
- 🧠 **Smart Contract Logic** to prevent double voting or unauthorized access

---

## 🛠️ Tech Stack
| Layer       | Technology                 |
|-------------|----------------------------|
| Blockchain  | Ethereum(Localhost), Solidity |
| Frontend    | React/NextJS, Web3.js |
| Backend     | Node.js  |
| Database    | Pinata Cloud , Smart Contract |
| Optional    | IPFS (for distributed storage) |

---

## ⚙️ Setup Instructions

### 📦 Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MetaMask](https://metamask.io/) extension in browser
- [Git](https://git-scm.com/) (optional for cloning)

---

## 🛠️ Installation

1. **Clone the repository** (or download ZIP)
```bash
git clone https://github.com/your-username/Decentralized-Voting-Starter-File.git
cd DecentraVote
```

2. **Navigate to the voting directory**
```bash
cd voting
```

3. **Install dependencies**
```bash
npm install
```

---

## 🚀 Running the Application

### Step 1: Start the Local Blockchain Network
Open **Terminal 1** and run:
```bash
npx hardhat node
```
This starts a local Ethereum network. Keep this terminal running.

### Step 2: Deploy Smart Contracts
Open **Terminal 2** and run:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
This deploys your smart contracts to the local network.

### Step 3: Start the Frontend Application
Open **Terminal 3** and run:
```bash
npm run dev
```
This starts the development server, usually accessible at `http://localhost:3000`

---

## 🔧 Configuration

### MetaMask Setup
1. Open MetaMask extension
2. Add a new network with these settings:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

### Import Test Accounts
When you run `npx hardhat node`, it provides test accounts with ETH. Import these accounts into MetaMask using their private keys for testing.

---

## 📁 Project Structure
```
voting/
├── contracts/          # Smart contract files (.sol)
├── scripts/           # Deployment scripts
├── pages/             # Next.js pages
├── components/        # React components
├── public/            # Static assets
├── styles/            # CSS/styling files
├── hardhat.config.js  # Hardhat configuration
└── package.json       # Dependencies and scripts
```

---

## 🔐 Security Features
- **Immutable Voting Records**: Once cast, votes cannot be changed
- **Access Control**: Only authorized addresses can vote
- **Double Voting Prevention**: Smart contract prevents multiple votes from same address
- **Transparent Results**: All voting data is publicly verifiable on blockchain

---

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

---

## 📊 Usage

1. **Admin Setup**: Deploy contracts and configure voting parameters
2. **Voter Registration**: Add authorized voter addresses
3. **Candidate Registration**: Add candidates to the election
4. **Voting Process**: Voters connect MetaMask and cast votes
5. **Results**: View real-time results and final tallies

---

## 🚨 Troubleshooting

**Common Issues:**
- **MetaMask not connecting**: Ensure you're on the correct network (localhost:8545)
- **Transaction failures**: Check you have sufficient ETH in your account
- **Contract not found**: Ensure deployment was successful and contract addresses are correct

**Reset blockchain state:**
```bash
npx hardhat clean
npx hardhat node --reset
```

---

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙏 Acknowledgments
- OpenZeppelin for secure smart contract libraries
- Hardhat for development environment
- MetaMask for Web3 integration

---

**⚡ Quick Start Summary:**
```bash
# Terminal 1
npx hardhat node

# Terminal 2  
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3
npm run dev
```

Happy Voting! 🗳️✨
<img width="1200" height="512" alt="Commits over time" src="https://github.com/user-attachments/assets/2ad568d6-aef8-4c5d-bcbc-2569778cbac2" />
<img width="1169" height="445" alt="image" src="https://github.com/user-attachments/assets/46e2f598-5989-4147-9e1d-28fae5bda674" />
![WhatsApp Image 2025-07-13 at 02 59 45_038418b1](https://github.com/user-attachments/assets/6b4c1812-db64-4c07-a3ce-125922b92443)
![WhatsApp Image 2025-07-13 at 03 00 08_2a7da2ba](https://github.com/user-attachments/assets/656163bf-b288-4951-ab8b-205647ab1910)



# Cross-Chain Transaction dApp

This project is a cross-chain transaction dApp built with Next.js for the frontend and Hardhat for the backend. It allows users to connect their wallets, view balances, and send transactions seamlessly.

## 🚀 Features
- Wallet connection using Thirdweb
- Sending Ethereum transactions
- Viewing transaction history
- Next.js (App Router) frontend
- Hardhat backend for smart contract development

## 🛠 Tech Stack
- **Frontend:** Next.js (TypeScript, App Router), Thirdweb, Ethers.js
- **Backend:** Hardhat, Solidity

## 📂 Project Structure
```
root/
│── backend/          # Hardhat project
│   ├── contracts/    # Solidity smart contracts
│   ├── scripts/      # Deployment scripts
│   ├── test/         # Smart contract tests
│── frontend/         # Next.js project
│   ├── components/   # Reusable UI components
│   ├── app/          # Pages (App Router)
│   ├── public/       # Static assets
│   ├── .env.local    # API keys (ignored in Git)
│── README.md         # Project documentation
│── package.json      # Dependencies
```

## 🔧 Setup & Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Set up the backend (Hardhat)
```sh
cd backend
npm install
```

#### Create a `.env` file in the `backend/` directory:
```sh
PRIVATE_KEY=your_wallet_private_key
ALCHEMY_API_KEY=your_alchemy_key
```

#### Compile and deploy smart contracts:
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### 3️⃣ Set up the frontend (Next.js)
```sh
cd ../frontend
npm install
```

#### Create a `.env.local` file in the `frontend/` directory:
```sh
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_THIRDWEB_API_KEY=your_thirdweb_key
```

### 4️⃣ Run the frontend
```sh
npm run dev
```
Then, open `http://localhost:3000` in your browser.

## 🚀 Deployment
You can deploy the frontend using Vercel:
```sh
npx vercel
```

## 📜 License
This project is open-source and available under the MIT License.

## 🤝 Contributing
Feel free to fork this repository and submit pull requests!

## 📞 Contact
For any questions, reach out at [contact@parthdev.me] or open an issue.


"use client";

import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

const WalletTransactions = () => {

    interface Transaction {
        hash: string;
        from: string;
        to: string;
        value: string;
        timeStamp: string;
      }
      
      const [transactions, setTransactions] = useState<Transaction[]>([]);
      
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) return;
      setLoading(true);
      setError(null);

      try {
        // Use Etherscan, Alchemy, or Infura API
        const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY; // Use the key from .env.local
        const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

        const response = await axios.get(url);
        if (response.data.status !== "1") {
          throw new Error("Failed to fetch transactions.");
        }

        setTransactions(response.data.result);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Error fetching transactions.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching transactions.");
        }
      }
      

      setLoading(false);
    };

    fetchTransactions();
  }, [address]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {!address && <p className="text-gray-500">Connect your wallet to view transactions.</p>}
      {loading && <p className="text-blue-500">Fetching transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {transactions.length > 0 ? (
        <ul className="space-y-3">
          {transactions.slice(0, 10).map((tx, index) => (
            <li key={index} className="p-3 border rounded-lg">
              <p>
                <strong>Hash:</strong>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {tx.hash.substring(0, 12)}...
                </a>
              </p>
              <p>
                <strong>From:</strong> {tx.from.substring(0, 8)}... →{" "}
                <strong>To:</strong> {tx.to.substring(0, 8)}...
              </p>
              <p>
                <strong>Value:</strong> {parseFloat(tx.value) / 1e18} ETH
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default WalletTransactions;

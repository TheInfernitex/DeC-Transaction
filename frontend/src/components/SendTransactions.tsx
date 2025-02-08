"use client";

import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const SendTransactions = () => {
  const address = useAddress(); // Get connected wallet address
  const signer = useSigner(); // Get wallet signer

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendTransaction = async () => {
    if (!signer) {
      setError("Wallet not connected.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert ETH to Wei
      const value = ethers.utils.parseEther(amount);

      // Send transaction
      const tx = await signer.sendTransaction({
        to: recipient,
        value,
      });

      await tx.wait(); // Wait for confirmation

      setTxHash(tx.hash);
    } catch (err: any) {
      setError(err.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Send ETH Transaction</h2>

      {!address ? (
        <p className="text-red-500">Please connect your wallet first.</p>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium">Recipient Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="0xRecipientAddress"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Amount (ETH)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            onClick={sendTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send ETH"}
          </button>

          {txHash && (
            <p className="mt-3 text-green-500">
              ✅ Transaction sent!{" "}
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View on Etherscan
              </a>
            </p>
          )}

          {error && <p className="mt-3 text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
};

export default SendTransactions;

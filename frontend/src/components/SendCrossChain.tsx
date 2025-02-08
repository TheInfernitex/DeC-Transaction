"use client";

import { useState } from "react";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";

const SendCrossChain = () => {
  const address = useAddress();
  const signer = useSigner();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [destinationChain, setDestinationChain] = useState<"ethereum-sepolia" | "polygon-amoy">(
    "polygon-amoy"
  );
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendCrossChainTransaction = async () => {
    if (!signer || !address) {
      setError("Wallet not connected.");
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      // Initialize Axelar API
      const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
  
      // Get gas fee estimate - Force return type as string
      const gasFeeResponse = (await api.estimateGasFee(
        "ethereum-sepolia",
        destinationChain,
        "ETH"
      )) as string;
  
      // Convert gas fee to a valid BigNumberish type
      const gasFee = ethers.utils.parseEther(gasFeeResponse);
  
      console.log("Estimated Gas Fee (ETH):", ethers.utils.formatEther(gasFee));
  
      // Convert ETH amount to Wei
      const value = ethers.utils.parseEther(amount);
  
      // Send transaction
      const tx = await signer.sendTransaction({
        to: recipient, // Should be Axelar's gateway for cross-chain
        value: value.add(gasFee), // Add gas fee correctly
      });
  
      await tx.wait(); // Wait for confirmation
  
      setTxHash(tx.hash);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Transaction failed.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Send Cross-Chain Transaction</h2>

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

          <div className="mb-3">
            <label className="block text-sm font-medium">Destination Chain</label>
            <select
              className="w-full p-2 border rounded"
              value={destinationChain}
              onChange={(e) => setDestinationChain(e.target.value as "ethereum-sepolia" | "polygon-amoy")}
            >
              <option value="polygon-amoy">Polygon Amoy</option>
              <option value="ethereum-sepolia">Ethereum Sepolia</option>
            </select>
          </div>

          <button
            onClick={sendCrossChainTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Cross-Chain"}
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

export default SendCrossChain;

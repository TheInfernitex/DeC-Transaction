'use client';
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const TransactionDetails = ({ txHash }: { txHash: string }) => {
  const [txDetails, setTxDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const provider = new ethers.providers.AlchemyProvider(
          "sepolia", // Make sure this matches the network you are querying
          process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
        );

        const transaction = await provider.getTransaction(txHash);
        if (!transaction) {
          setError("Transaction not found.");
        } else {
          setTxDetails(transaction);
        }
      } catch (err) {
        setError("Error fetching transaction.");
        console.error(err);
      }
    };

    if (txHash) fetchTransaction();
  }, [txHash]);

  return (
    <div>
      {error ? <p>{error}</p> : txDetails ? <pre>{JSON.stringify(txDetails, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default TransactionDetails;

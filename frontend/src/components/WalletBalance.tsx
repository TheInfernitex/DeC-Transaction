"use client";

import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const WalletBalance = () => {
  const address = useAddress();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address && typeof window !== "undefined" && window.ethereum) {
        try {
          // Type assertion instead of redeclaration
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider
          );
          // Retrieve the balance in wei
          const balanceWei = await provider.getBalance(address);
          // Convert the balance to ether
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      }
    };

    fetchBalance();
  }, [address]);

  if (!address) {
    return <p>Please connect your wallet.</p>;
  }

  return (
    <div>
      <p>Balance: {balance !== null ? `${balance} ETH` : "Loading..."}</p>
    </div>
  );
};

export default WalletBalance;

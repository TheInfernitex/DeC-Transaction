"use client";

import { useAddress, useConnect, useDisconnect, metamaskWallet } from "@thirdweb-dev/react";

const WalletConnect = () => {
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();

  return (
    <div className="p-4">
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <button onClick={disconnect} className="px-4 py-2 bg-red-500 text-white rounded">Disconnect</button>
        </div>
      ) : (
        <button
          onClick={() => connect(metamaskWallet())}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;

"use client";

import { ThirdwebProvider, metamaskWallet, walletConnect, coinbaseWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const ClientThirdWebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain={Sepolia} // Default to Sepolia, can be dynamic later
      supportedWallets={[metamaskWallet(), walletConnect(), coinbaseWallet()]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default ClientThirdWebProvider;


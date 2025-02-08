import WalletBalance from "@/components/WalletBalance";
import WalletConnect from "../components/WalletConnect";
import WalletTransactions from "@/components/WalletTransactions";
import SendTransactions from "@/components/SendTransactions";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 flex-col p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Wallet Connect */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <WalletConnect />
        </div>

        {/* Wallet Balance */}
        <div className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center">
          <h2 className="text-lg font-bold">Wallet Balance</h2>
          <WalletBalance />
        </div>

        {/* Send Transaction */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <SendTransactions />
        </div>

        {/* Transaction History */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <WalletTransactions />
        </div>
      </div>
    </main>
  );
}

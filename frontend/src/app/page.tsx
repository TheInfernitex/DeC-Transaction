import WalletBalance from "@/components/WalletBalance";
import WalletConnect from "@/components/WalletConnect";
import WalletTransactions from "@/components/WalletTransactions";
import SendTransactions from "@/components/SendTransactions";
import SendCrossChain from "@/components/SendCrossChain";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-6">
        {/* Top Left: Wallet Connect & Balance */}
        <div className="space-y-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <WalletConnect />
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center">
            <h2 className="text-lg font-bold">Wallet Balance</h2>
            <WalletBalance />
          </div>
        </div>

        {/* Top Right: Send Transactions */}
        <div className="space-y-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <SendCrossChain />
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <SendTransactions />
          </div>
        </div>

        {/* Bottom: Transaction History (spanning full width) */}
        <div className="col-span-2 p-4 bg-white shadow-lg rounded-lg">
          <WalletTransactions />
        </div>
      </div>
    </main>
  );
}

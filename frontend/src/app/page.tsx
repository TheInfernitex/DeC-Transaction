import WalletBalance from "@/components/WalletBalance";
import WalletConnect from "../components/WalletConnect";
import TransactionHistory from "@/components/TransactionHistory";
import WalletTransactions from "@/components/WalletTransactions";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 flex-col">
      <WalletConnect />
      <WalletBalance />
      <WalletTransactions />
    </main>
  );
}

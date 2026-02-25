import { Link } from "expo-router";
import { Wallet } from "@components/icons/homepage-icons";

export default function Header({ totalBalance = 0 }: { totalBalance: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-foreground/40 text-xs font-medium">
            Total Balance
          </h2>
          <h1 className="text-3xl font-bold text-white mt-1">
            ₹
            {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </h1>
        </div>
        <Link
          href="/"
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
        >
          <Wallet className="text-indigo-400 w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}

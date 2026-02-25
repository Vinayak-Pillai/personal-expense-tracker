import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
} from "@/components/icons/homepage-icons";
import { INITIAL_TRANSACTIONS } from "@/utils/init-values";
import { Link } from "expo-router";

export default function RecentTransactions() {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-accent-foreground/70 font-semibold text-[12px]">
          Recent Transactions
        </h3>
        <Link
          href="/"
          className="text-indigo-400 text-xs font-medium flex items-center"
        >
          View All <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>
      <div className="space-y-3">
        {INITIAL_TRANSACTIONS.map((t) => {
          const isIncome = t.type === "income";
          return (
            <div
              key={t.id}
              className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="text-emerald-500 w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="text-rose-500 w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-slate-200 font-medium text-sm">
                    {t.note || "Transaction"}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`font-semibold ${isIncome ? "text-emerald-400" : "text-slate-200"}`}
              >
                {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

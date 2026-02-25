import { ArrowDownLeft, ArrowUpRight } from "@/components/icons/homepage-icons";
import { formatCurrency } from "@/utils/lib";

export default function QuickStats({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-stat-card-bg p-4 rounded-2xl border border-stat-card-border flex flex-col justify-between">
        <div className="bg-stat-success/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
          <ArrowDownLeft className="text-stat-success w-5 h-5" />
        </div>
        <div>
          <span className="text-stat-card-muted text-xs font-medium">Income</span>
          <p className="text-lg font-bold text-stat-success-text mt-1">
            +₹{formatCurrency(income)}
          </p>
        </div>
      </div>
      <div className="bg-stat-card-bg p-4 rounded-2xl border border-stat-card-border flex flex-col justify-between">
        <div className="bg-stat-danger/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
          <ArrowUpRight className="text-stat-danger w-5 h-5" />
        </div>
        <div>
          <span className="text-stat-card-muted text-xs font-medium">Expense</span>
          <p className="text-lg font-bold text-stat-danger-text mt-1">
            -₹{formatCurrency(expense)}
          </p>
        </div>
      </div>
    </div>
  );
}

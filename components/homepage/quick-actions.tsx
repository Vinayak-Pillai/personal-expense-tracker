import { EllipsisHorizontal, TrendingUp, Wallet } from "@/components/icons/homepage-icons";
import { Link } from "expo-router";

export default function QuickActions() {
  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-accent-foreground/70 font-semibold text-[12px]">Quick Actions</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        <Link href="/" className="flex flex-col items-center gap-2 min-w-18">
          <div className="w-14 h-14 rounded-2xl bg-action-invest-bg/20 flex items-center justify-center border border-action-invest-border/30">
            <TrendingUp className="text-action-invest-icon w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Invest</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-2 min-w-18">
          <div className="w-14 h-14 rounded-2xl bg-action-accounts-bg/20 flex items-center justify-center border border-action-accounts-border/30">
            <Wallet className="text-action-accounts-icon w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Accounts</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-2 min-w-18">
          <div className="w-14 h-14 rounded-2xl bg-action-more-bg/20 flex items-center justify-center border border-action-more-border/30">
            <EllipsisHorizontal className="text-action-more-icon w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">More</span>
        </Link>
      </div>
    </div>
  );
}

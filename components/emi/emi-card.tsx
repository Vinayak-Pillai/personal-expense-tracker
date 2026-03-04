import { View } from "react-native";
import CircleDollarBadge from "../icons/emi-icons";
import { TSelectEmi } from "@/db/schema";
import { Calendar } from "../icons/add-transactions-icons";
import { ORDINAL } from "@/utils/lib";

export default function EmiCard({
  emi,
  isDueToday,
  isDueSoon,
  days,
}: {
  emi: TSelectEmi;
  isDueToday: boolean;
  isDueSoon: boolean;
  days: number;
}) {
  return (
    <View className="flex items-center justify-between gap-3">
      {/* Left: icon + info */}
      <View className="flex items-center gap-3 min-w-0">
        <View
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
            isDueToday ? "bg-rose-500/20" : "bg-indigo-500/15"
          }`}
        >
          <CircleDollarBadge
            color={isDueToday ? "text-rose-400" : "text-indigo-400"}
          />
        </View>
        <View className="min-w-0">
          <h4 className="font-semibold text-white truncate">{emi.name}</h4>
          <View className="flex items-center gap-2 mt-0.5 flex-wrap">
            {/* Deduction day badge */}
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                isDueToday
                  ? "bg-rose-500/20 text-rose-400"
                  : isDueSoon
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-slate-800 text-slate-400"
              }`}
            >
              <Calendar />
              {isDueToday ? "Due Today" : `${ORDINAL(emi.date)} · ${days}d`}
            </span>
            {/* Account badge */}
            {/*{account && (
                         <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                           <span className={`w-2 h-2 rounded-full ${accountColorDot[account.color] ?? 'bg-slate-500'}`} />
                           {account.name}
                         </span>
                       )}*/}
          </View>
        </View>
      </View>
    </View>
  );
}

import { Pressable, View } from "react-native";
import {
  CheckCircle,
  CircleDollarBadge,
  Pencil,
  Trash,
} from "../icons/emi-icons";
import { TSelectEmi } from "@/db/schema";
import { Calendar } from "../icons/add-transactions-icons";
import { ORDINAL } from "@/utils/lib";
import { useState } from "react";

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
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      // deleteEMI(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };
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
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-white font-bold">
          ${emi.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <Pressable
          // onClick={() => openEdit(emi)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
        >
          <Pencil />
        </Pressable>
        <Pressable
          onPress={() => handleDelete(String(emi.id))}
          className={`p-1.5 rounded-lg transition-colors ${
            deleteConfirm === String(emi.id)
              ? "bg-rose-500/20 text-rose-400"
              : "text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
          }`}
          // title={
          //   deleteConfirm === String(emi.id) ? "Tap again to confirm" : "Delete"
          // }
        >
          {deleteConfirm === String(emi.id) ? <CheckCircle /> : <Trash />}
        </Pressable>
      </div>
    </View>
  );
}

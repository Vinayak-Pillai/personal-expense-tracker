import { TSelectEmi } from "@/db/schema";
import { formatCurrency, ORDINAL } from "@/utils/lib";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar } from "../icons/add-transactions-icons";
import {
  CheckCircle,
  CircleDollarBadge,
  CircleRupeeBadge,
  Pencil,
  Trash,
} from "../icons/emi-icons";
import { useEmi } from "./emi-context";

export default function EmiCard({
  emi,
  isDueToday,
  isDueSoon,
  days,
}: {
  emi: TSelectEmi & { accountName: string | null };
  isDueToday: boolean;
  isDueSoon: boolean;
  days: number;
}) {
  const { fetchEmiById, deleteById } = useEmi();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      setDeleteConfirm(null);
      deleteById(id);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };
  return (
    <View
      className={`my-3 bg-slate-900 border rounded-2xl p-5 transition-all ${
        isDueToday
          ? "border-rose-500/60 shadow-rose-900/30 shadow-lg"
          : isDueSoon
            ? "border-amber-500/40"
            : "border-slate-800"
      }`}
    >
      <View className="flex flex-row items-center justify-between gap-3">
        {/* Left: icon + info */}
        <View className="flex flex-row items-center gap-3 min-w-0 flex-1">
          <View
            className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
              isDueToday ? "bg-rose-500/20" : "bg-indigo-500/15"
            }`}
          >
            <CircleRupeeBadge color={isDueToday ? "#fb7185" : "#818cf8"} />
          </View>
          <View className="min-w-0 flex-1">
            <Text
              className="font-semibold text-white truncate"
              numberOfLines={1}
            >
              {emi.name}
            </Text>
            <View className="flex flex-row items-center gap-2 mt-0.5 flex-wrap">
              {/* Deduction day badge */}
              <View
                className={`flex flex-row items-center gap-1 px-2 py-0.5 rounded-full ${
                  isDueToday
                    ? "bg-rose-500/20"
                    : isDueSoon
                      ? "bg-amber-500/20"
                      : "bg-slate-800"
                }`}
              >
                <Calendar
                  color={
                    isDueToday
                      ? "#fb7185" // text-rose-400
                      : isDueSoon
                        ? "#fbbf24" // text-amber-400
                        : "#94a3b8" // text-slate-400
                  }
                  className="w-3 h-3"
                />
                <Text
                  className={`text-xs font-medium ${
                    isDueToday
                      ? "text-rose-400"
                      : isDueSoon
                        ? "text-amber-400"
                        : "text-slate-400"
                  }`}
                >
                  {isDueToday ? "Due Today" : `${ORDINAL(emi.date)} · ${days}d`}
                </Text>
              </View>
              {/* Account badge */}
              {emi.accountId && (
                <View className="flex flex-row items-center gap-1">
                  <View className="w-2 h-2 rounded-full bg-green-600" />
                  <Text className="text-xs text-slate-500">
                    {emi.accountName}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Right: amount + actions */}
        <View className="flex flex-row items-center gap-2 shrink-0">
          <Text className="text-white font-bold">
            ₹{formatCurrency(emi.amount)}
          </Text>
          <Pressable
            onPress={() => fetchEmiById(emi.id)}
            className="p-1.5 rounded-lg active:bg-indigo-500/10 transition-colors"
          >
            <Pencil color="#64748b" />
          </Pressable>
          <Pressable
            onPress={() => handleDelete(emi.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              deleteConfirm === emi.id
                ? "bg-rose-500/20"
                : "active:bg-rose-500/10"
            }`}
          >
            {deleteConfirm === emi.id ? (
              <CheckCircle
                color={
                  deleteConfirm === emi.id
                    ? "#fb7185" // text-rose-400
                    : "#64748b" // text-slate-500
                }
              />
            ) : (
              <Trash color="#64748b" /> // text-slate-500
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

import ArrowRightLeft, {
  ChartPie,
  CirclePlus,
  CreditCard,
  Home,
} from "@/components/icons/footer-icons";
import { Link, usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function Footer() {
  const pathname = usePathname();

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe-area-inset-bottom z-50">
      <View className="flex-row justify-evenly items-center h-16 w-full mx-auto px-2 gap-3">
        <Link href={"/" as any}>
          <View className="flex-col items-center justify-center w-16 h-full">
            <Home
              className="mb-1 size-5"
              color={pathname === "/" ? "#818cf8" : "#94a3b8"}
            />
            <Text
              className="text-[10px] font-medium"
              style={{ color: pathname === "/" ? "#818cf8" : "#94a3b8" }}
            >
              Home
            </Text>
          </View>
        </Link>
        <Link href={"/accounts"}>
          <View className="flex-col items-center justify-center w-16 h-full">
            <CreditCard
              className="mb-1 size-5"
              color={pathname === "/accounts" ? "#818cf8" : "#94a3b8"}
            />
            <Text
              className="text-[10px] font-medium"
              style={{
                color: pathname === "/accounts" ? "#818cf8" : "#94a3b8",
              }}
            >
              Accounts
            </Text>
          </View>
        </Link>
        <Link href={"/add" as any}>
          <View className="flex-col items-center justify-center w-16 h-full -mt-6">
            <View className="bg-indigo-600 rounded-full p-3 shadow-lg shadow-indigo-900/50 border-4 border-slate-950">
              <CirclePlus className="size-6" color="#ffffff" />
            </View>
          </View>
        </Link>
        <Link href={"/investments" as any}>
          <View className="flex-col items-center justify-center w-16 h-full">
            <ChartPie
              className="mb-1 size-5"
              color={pathname === "/investments" ? "#818cf8" : "#94a3b8"}
            />
            <Text
              className="text-[10px] font-medium"
              style={{
                color: pathname === "/investments" ? "#818cf8" : "#94a3b8",
              }}
            >
              Invest
            </Text>
          </View>
        </Link>
        <Link href={"/transactions" as any}>
          <View className="flex-col items-center justify-center w-16 h-full">
            <ArrowRightLeft
              className="mb-1 size-5"
              color={pathname === "/transactions" ? "#818cf8" : "#94a3b8"}
            />
            <Text
              className="text-[10px] font-medium"
              style={{
                color: pathname === "/transactions" ? "#818cf8" : "#94a3b8",
              }}
            >
              History
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

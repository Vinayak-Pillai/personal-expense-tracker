import ArrowRightLeft, {
  ChartPie,
  CirclePlus,
  CreditCard,
  Home,
} from "@/components/icons/footer-icons";
import { Link, usePathname } from "expo-router";

const navItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: CreditCard, label: "Accounts", to: "/accounts" },
  { icon: CirclePlus, label: "Add", to: "/add", isPrimary: true },
  { icon: ChartPie, label: "Invest", to: "/investments" },
  { icon: ArrowRightLeft, label: "History", to: "/transactions" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.to;

          return (
            <Link
              key={item.to}
              href={item.to as any}
              className={`
                flex flex-col items-center justify-center w-16 h-full transition-colors duration-200
                ${item.isPrimary ? "-mt-6" : ""}
                ${isActive && !item.isPrimary ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"}
              `}
            >
              {item.isPrimary ? (
                <div className="bg-indigo-600 rounded-full p-3 shadow-lg shadow-indigo-900/50 border-4 border-slate-950">
                  <item.icon className="text-white size-6" />
                </div>
              ) : (
                <>
                  <item.icon className="mb-1 size-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

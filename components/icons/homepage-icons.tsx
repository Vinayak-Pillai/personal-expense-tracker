import Svg, { Circle, Path } from "react-native-svg";
export function Wallet({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <Path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </Svg>
  );
}

export function ArrowDownLeft({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Path d="M17 7 7 17" />
      <Path d="M17 17H7V7" />
    </Svg>
  );
}

export function ArrowUpRight({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Path d="M7 7h10v10" />
      <Path d="M7 17 17 7" />
    </Svg>
  );
}

export function TrendingUp({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Path d="M16 7h6v6" />
      <Path d="m22 7-8.5 8.5-5-5L2 17" />
    </Svg>
  );
}

export function EllipsisHorizontal({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="19" cy="12" r="1" />
      <Circle cx="5" cy="12" r="1" />
    </Svg>
  );
}

export function ChevronRight({ className, color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      color={color}
    >
      <Path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

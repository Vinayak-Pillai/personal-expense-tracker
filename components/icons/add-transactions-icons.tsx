import Svg, { Path, Rect } from "react-native-svg";

export function ChevronLeft({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
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
      color={color}
      className={className}
    >
      <Path d="m15 18-6-6 6-6" />
    </Svg>
  );
}

export function Calendar({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      color={color}
      className={className}
    >
      <Path d="M8 2v4" />
      <Path d="M16 2v4" />
      <Rect width="18" height="18" x="3" y="4" rx="2" />
      <Path d="M3 10h18" />
    </Svg>
  );
}

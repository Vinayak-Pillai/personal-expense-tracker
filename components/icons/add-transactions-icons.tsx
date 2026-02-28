import Svg, { Path } from "react-native-svg";

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

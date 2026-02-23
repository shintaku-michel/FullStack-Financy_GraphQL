import { type LucideIcon } from "lucide-react";

interface CategoryIndicatorProps {
  icon: LucideIcon;
  iconColor: string;
  value: string | number;
  label: string;
}

export function CategoryIndicator({
  icon: Icon,
  iconColor,
  value,
  label,
}: CategoryIndicatorProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Icon size={22} className={`${iconColor} mt-1`} />
        <div className="flex flex-col items-start">
          <p className="text-xl font-semibold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 uppercase">{label}</p>
        </div>
      </div>
    </div>
  );
}

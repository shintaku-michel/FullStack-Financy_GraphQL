import { type LucideIcon } from "lucide-react";

interface DashboardSummaryCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  valueColor?: string;
}

export function DashboardSummaryCard({
  icon: Icon,
  iconColor,
  label,
  value,
  valueColor = "text-gray-800",
}: DashboardSummaryCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
        <Icon size={16} className={`${iconColor} mr-1`} />
        {label}
      </p>
      <p className={`mt-2 text-2xl font-semibold ${valueColor}`}>{value}</p>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, type LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  name: string;
  description: string;
  badgeBgColor: string;
  badgeTextColor: string;
  itemCount: number;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function CategoryCard({
  icon: Icon,
  iconBgColor,
  iconColor,
  name,
  description,
  badgeBgColor,
  badgeTextColor,
  itemCount,
  onDelete,
  onEdit,
}: CategoryCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg", iconBgColor)}>
          <Icon size={20} className={iconColor} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onDelete}
            className="text-red-400 hover:text-red-600 hover:bg-red-50 border-gray-200"
          >
            <Trash2 size={14} />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600 border-gray-200"
          >
            <Pencil size={14} />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span
          className={cn(
            "text-xs px-3 py-1 rounded-full font-medium",
            badgeBgColor,
            badgeTextColor
          )}
        >
          {name}
        </span>
        <span className="text-sm text-gray-500">
          {itemCount} {itemCount === 1 ? "item" : "itens"}
        </span>
      </div>
    </div>
  );
}

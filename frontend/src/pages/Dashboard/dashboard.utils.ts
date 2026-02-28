export { ICON_MAP, COLOR_MAP, DEFAULT_ICON, DEFAULT_COLORS } from "@/lib/categoryMaps";
export type { CategoryColors } from "@/lib/categoryMaps";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: {
    id: string;
    name: string;
    icon?: string;
    color?: string;
  };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface CategoryWithStats extends Category {
  items: number;
  totalAmount: number;
}

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

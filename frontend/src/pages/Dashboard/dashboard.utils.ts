import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  Car,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Tag,
  Ticket,
  ToolCase,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  briefcaseBusiness: BriefcaseBusiness,
  car: Car,
  heartpulse: HeartPulse,
  piggybank: PiggyBank,
  cart: ShoppingCart,
  ticket: Ticket,
  toolcase: ToolCase,
  utensils: Utensils,
  pawprint: PawPrint,
  home: Home,
  gift: Gift,
  dumbbell: Dumbbell,
  book: BookOpen,
  baggageclaim: BaggageClaim,
  mailbox: Mailbox,
  receipttext: ReceiptText,
};

export const COLOR_MAP: Record<string, { iconBg: string; iconColor: string; badgeBg: string; badgeText: string }> = {
  green: { iconBg: "bg-green-100/10", iconColor: "text-green-500", badgeBg: "bg-green-100/10", badgeText: "text-green-600" },
  blue: { iconBg: "bg-blue-100/10", iconColor: "text-blue-500", badgeBg: "bg-blue-100/10", badgeText: "text-blue-600" },
  purple: { iconBg: "bg-purple-100/10", iconColor: "text-purple-500", badgeBg: "bg-purple-100/10", badgeText: "text-purple-600" },
  pink: { iconBg: "bg-pink-100/10", iconColor: "text-pink-500", badgeBg: "bg-pink-100/10", badgeText: "text-pink-600" },
  red: { iconBg: "bg-red-100/10", iconColor: "text-red-500", badgeBg: "bg-red-100/10", badgeText: "text-red-600" },
  orange: { iconBg: "bg-orange-100/10", iconColor: "text-orange-500", badgeBg: "bg-orange-100/10", badgeText: "text-orange-600" },
  amber: { iconBg: "bg-amber-100/10", iconColor: "text-amber-500", badgeBg: "bg-amber-100/10", badgeText: "text-amber-600" },
};

export const DEFAULT_ICON = Tag;
export const DEFAULT_COLORS = COLOR_MAP.blue;

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

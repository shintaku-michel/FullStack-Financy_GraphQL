import { Page } from "@/components/Page";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import { useQuery } from "@apollo/client/react";
import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  Car,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Mailbox,
  PawPrint,
  PiggyBank,
  Plus,
  ReceiptText,
  ShoppingCart,
  Tag,
  Ticket,
  ToolCase,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const ICON_MAP: Record<string, LucideIcon> = {
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

const COLOR_MAP: Record<string, { iconBg: string; iconColor: string; badgeBg: string; badgeText: string }> = {
  green:  { iconBg: "bg-green-100",   iconColor: "text-green-500",   badgeBg: "bg-green-100",   badgeText: "text-green-600"  },
  blue:   { iconBg: "bg-blue-100",    iconColor: "text-blue-500",    badgeBg: "bg-blue-100",    badgeText: "text-blue-600"   },
  purple: { iconBg: "bg-purple-100",  iconColor: "text-purple-500",  badgeBg: "bg-purple-100",  badgeText: "text-purple-600" },
  pink:   { iconBg: "bg-pink-100",    iconColor: "text-pink-500",    badgeBg: "bg-pink-100",    badgeText: "text-pink-600"   },
  red:    { iconBg: "bg-red-100",     iconColor: "text-red-500",     badgeBg: "bg-red-100",     badgeText: "text-red-600"    },
  orange: { iconBg: "bg-orange-100",  iconColor: "text-orange-500",  badgeBg: "bg-orange-100",  badgeText: "text-orange-600" },
  amber:  { iconBg: "bg-amber-100",   iconColor: "text-amber-500",   badgeBg: "bg-amber-100",   badgeText: "text-amber-600"  },
};

const DEFAULT_ICON = Tag;
const DEFAULT_COLORS = COLOR_MAP.blue;

interface Transaction {
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

interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function Dashboard() {
  const { data: txData } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS);
  const { data: catData } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  const allTransactions = txData?.listTransactions ?? [];
  const allCategories = catData?.listCategories ?? [];

  const currentMonth = new Date().toISOString().slice(0, 7);

  const totalBalance = allTransactions.reduce(
    (sum, tx) => sum + (tx.type === "INCOME" ? tx.amount : -tx.amount),
    0
  );

  const monthlyIncome = allTransactions
    .filter((tx) => tx.type === "INCOME" && tx.createdAt.slice(0, 7) === currentMonth)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyExpense = allTransactions
    .filter((tx) => tx.type === "EXPENSE" && tx.createdAt.slice(0, 7) === currentMonth)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const recentTransactions = [...allTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const categoriesData = allCategories
    .map((cat) => {
      const catTxs = allTransactions.filter((tx) => tx.category.id === cat.id);
      return { ...cat, items: catTxs.length, totalAmount: catTxs.reduce((s, tx) => s + tx.amount, 0) };
    })
    .filter((cat) => cat.items > 0)
    .sort((a, b) => b.items - a.items)
    .slice(0, 5);

  return (
    <Page>
      <div className="space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
              <Wallet size={16} className="text-purple-500 mr-1" />
              Saldo total
            </p>
            <p className={`mt-2 text-2xl font-semibold ${totalBalance >= 0 ? "text-gray-800" : "text-red-600"}`}>
              {formatCurrency(totalBalance)}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
              <CircleArrowUp size={16} className="text-green-500 mr-1" />
              Receitas do mês
            </p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{formatCurrency(monthlyIncome)}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
              <CircleArrowDown size={16} className="text-red-500 mr-1" />
              Despesas do mês
            </p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{formatCurrency(monthlyExpense)}</p>
          </div>
        </div>

        {/* Transações + Categorias */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transações Recentes — 2 colunas */}
          <div className="col-span-1 lg:col-span-2 rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="text-xs font-normal text-gray-500 uppercase tracking-wide">
                Transações Recentes
              </span>
              <Link to="/transactions" className="flex items-center gap-1 text-sm text-[#1F6F43] font-normal">
                Ver todas <ChevronRight size={14} />
              </Link>
            </div>

            <div>
              {recentTransactions.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">Nenhuma transação registrada.</p>
              )}
              {recentTransactions.map((tx) => {
                const Icon = ICON_MAP[tx.category.icon ?? ""] ?? DEFAULT_ICON;
                const colors = COLOR_MAP[tx.category.color ?? ""] ?? DEFAULT_COLORS;
                const formattedDate = new Date(tx.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                });
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors not-last:border-b not-last:border-gray-100"
                  >
                    <div className={`h-9 w-9 rounded-full ${colors.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={16} className={colors.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                      <p className="text-xs text-gray-400">{formattedDate}</p>
                    </div>
                    <span className={`hidden sm:inline-flex text-xs font-medium px-3 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                      {tx.category.name}
                    </span>
                    <div className="flex items-center gap-1 min-w-30 justify-end">
                      <span className="text-sm font-medium text-gray-800">
                        {tx.type === "INCOME" ? "+" : "-"} {formatCurrency(tx.amount)}
                      </span>
                      {tx.type === "INCOME"
                        ? <CircleArrowUp size={16} className="text-green-500" />
                        : <CircleArrowDown size={16} className="text-red-500" />
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-4 border-t border-gray-100">
              <Link
                to="/transactions"
                className="flex items-center gap-1 text-sm text-[#1F6F43] mx-auto font-normal w-fit"
              >
                <Plus size={14} /> Nova transação
              </Link>
            </div>
          </div>

          {/* Categorias — 1 coluna */}
          <div className="rounded-xl bg-white shadow-sm self-start">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="text-xs font-normal text-gray-500 uppercase tracking-wide">
                Categorias
              </span>
              <Link to="/categories" className="flex items-center gap-1 text-sm text-[#1F6F43] font-normal">
                Gerenciar <ChevronRight size={14} />
              </Link>
            </div>

            <div>
              {categoriesData.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">Nenhuma categoria utilizada.</p>
              )}
              {categoriesData.map((cat) => {
                const colors = COLOR_MAP[cat.color ?? ""] ?? DEFAULT_COLORS;
                return (
                  <div
                    key={cat.id}
                    className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                      {cat.name}
                    </span>
                    <span className="ml-auto w-16 text-right text-xs text-gray-400">{cat.items} itens</span>
                    <span className="w-24 text-right text-sm font-semibold text-gray-800">{formatCurrency(cat.totalAmount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

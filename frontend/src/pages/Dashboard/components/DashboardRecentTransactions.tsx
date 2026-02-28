import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  COLOR_MAP,
  DEFAULT_COLORS,
  DEFAULT_ICON,
  ICON_MAP,
  formatCurrency,
  type Transaction,
} from "../dashboard.utils";

interface DashboardRecentTransactionsProps {
  transactions: Transaction[];
  onNewTransaction: () => void;
}

export function DashboardRecentTransactions({ transactions, onNewTransaction }: DashboardRecentTransactionsProps) {
  return (
    <div className="col-span-1 lg:col-span-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Transações Recentes
        </span>
        <Link to="/transactions" className="flex items-center gap-1 text-sm text-[#1F6F43] dark:text-green-400 font-normal">
          Ver todas <ChevronRight size={14} />
        </Link>
      </div>

      <div>
        {transactions.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">Nenhuma transação registrada.</p>
        )}
        {transactions.map((tx) => {
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
              className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <div className={`h-9 w-9 rounded-full ${colors.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={colors.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{tx.description}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</p>
              </div>
              <span className={`hidden sm:inline-flex text-xs font-medium px-3 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                {tx.category.name}
              </span>
              <div className="flex items-center gap-1 min-w-30 justify-end">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
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

      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onNewTransaction}
          className="flex items-center gap-1 text-sm text-[#1F6F43] dark:text-green-400 mx-auto font-normal cursor-pointer">
          <Plus size={14} /> Nova transação
        </button>
      </div>
    </div>
  );
}

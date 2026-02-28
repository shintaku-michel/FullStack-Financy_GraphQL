import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COLOR_MAP, DEFAULT_COLORS, formatCurrency, type CategoryWithStats } from "../dashboard.utils";

interface DashboardCategoriesProps {
  categories: CategoryWithStats[];
}

export function DashboardCategories({ categories }: DashboardCategoriesProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm self-start">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Categorias
        </span>
        <Link to="/categories" className="flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400 font-normal">
          Gerenciar <ChevronRight size={14} />
        </Link>
      </div>

      <div>
        {categories.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">Nenhuma categoria utilizada.</p>
        )}
        {categories.map((cat) => {
          const colors = COLOR_MAP[cat.color ?? ""] ?? DEFAULT_COLORS;
          return (
            <div
              key={cat.id}
              className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
                {cat.name}
              </span>
              <span className="ml-auto w-16 text-right text-xs text-gray-400 dark:text-gray-500">{cat.items} itens</span>
              <span className="w-24 text-right text-sm font-semibold text-gray-800 dark:text-gray-100">{formatCurrency(cat.totalAmount)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

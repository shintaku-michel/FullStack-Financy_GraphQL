import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  Car,
  ChevronLeft,
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
  ReceiptText,
  ShoppingCart,
  SquarePen,
  Tag,
  Ticket,
  ToolCase,
  Trash2,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

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

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
}

export function TransactionTable({ transactions, loading, onDelete, onEdit }: TransactionTableProps) {
  const qtdItensTable = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / qtdItensTable);
  const startIndex = (currentPage - 1) * qtdItensTable;
  const visibleTransactions = transactions.slice(startIndex, startIndex + qtdItensTable);

  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-6 py-4">
              Descrição
            </th>
            <th className="hidden sm:table-cell text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Data
            </th>
            <th className="hidden md:table-cell text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Categoria
            </th>
            <th className="hidden sm:table-cell text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Tipo
            </th>
            <th className="hidden sm:table-cell text-right text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Valor
            </th>
            <th className="hidden sm:table-cell text-right text-xs font-normal text-gray-400 uppercase tracking-wide px-6 py-4">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={6} className="text-center text-sm text-gray-400 py-8">
                Carregando...
              </td>
            </tr>
          )}
          {!loading && visibleTransactions.map((tx, index) => {
            const Icon = ICON_MAP[tx.category.icon ?? ""] ?? DEFAULT_ICON;
            const colors = COLOR_MAP[tx.category.color ?? ""] ?? DEFAULT_COLORS;
            const formattedDate = new Date(tx.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
            return (
              <tr
                key={tx.id}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  index < visibleTransactions.length - 1 && "border-b border-gray-100"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-start lg:items-center gap-3">
                    <div className={cn("p-2 rounded-lg shrink-0 mt-0.5 lg:mt-0", colors.iconBg)}>
                      <Icon size={16} className={colors.iconColor} />
                    </div>
                    <div className="min-w-0">
                      <span className="font-medium text-gray-800 text-sm block truncate">{tx.description}</span>
                      <div className="sm:hidden flex items-center gap-2 text-xs text-gray-400">
                        <span>{formattedDate}</span>
                        <span className={tx.type === "INCOME" ? "text-green-600" : "text-red-600"}>
                          {tx.type === "INCOME" ? "+" : "-"} R${" "}
                          {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <span className={"sm:hidden text-xs rounded-full font-normal text-gray-400"}>{tx.category.name}</span>
                    </div>
                  </div>
                  <div className="sm:hidden flex items-center gap-2 mt-2 pl-11">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onDelete?.(tx.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 border-gray-200"
                    >
                      <Trash2 size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onEdit?.(tx)}
                      className="text-gray-400 hover:text-gray-600 border-gray-200"
                    >
                      <SquarePen size={14} />
                    </Button>
                  </div>
                </td>

                <td className="hidden sm:table-cell px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{formattedDate}</td>

                <td className="hidden md:table-cell px-4 py-4">
                  <span
                    className={cn(
                      "text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap",
                      colors.badgeBg,
                      colors.badgeText
                    )}
                  >
                    {tx.category.name}
                  </span>
                </td>

                <td className="hidden sm:table-cell px-4 py-4">
                  {tx.type === "INCOME" ? (
                    <div className="flex items-center gap-1.5 text-green-600">
                      <CircleArrowUp size={15} />
                      <span className="text-sm">Entrada</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-600">
                      <CircleArrowDown size={15} />
                      <span className="text-sm">Saída</span>
                    </div>
                  )}
                </td>

                <td className="hidden sm:table-cell px-4 py-4 text-right whitespace-nowrap">
                  <span className={cn("text-sm font-medium", tx.type === "INCOME" ? "text-green-600" : "text-red-600")}>
                    {tx.type === "INCOME" ? "+" : "-"} R${" "}
                    {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </td>

                <td className="hidden sm:table-cell px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onDelete?.(tx.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 border-gray-200"
                    >
                      <Trash2 size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => onEdit?.(tx)}
                      className="text-gray-400 hover:text-gray-600 border-gray-200"
                    >
                      <SquarePen size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
          {!loading && transactions.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-sm text-gray-400 py-8">
                Nenhuma transação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          {transactions.length === 0
            ? "0 resultados"
            : `${startIndex + 1} a ${Math.min(startIndex + qtdItensTable, transactions.length)} | ${transactions.length} resultados`}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            className="border-gray-200 text-gray-400"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={14} />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="icon-sm"
              variant={currentPage === page ? "default" : "outline"}
              className={
                currentPage === page
                  ? "text-white hover:bg-[#124B2B] border-0"
                  : "border-gray-200 text-gray-500"
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon-sm"
            className="border-gray-200 text-gray-400"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

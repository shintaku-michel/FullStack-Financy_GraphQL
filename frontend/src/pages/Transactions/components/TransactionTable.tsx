import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  PiggyBank,
  ShoppingCart,
  SquarePen,
  Tag,
  Ticket,
  Trash2,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type TransactionType = "entrada" | "saida";

interface Transaction {
  id: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  description: string;
  date: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  type: TransactionType;
  amount: number;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    icon: Utensils,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    description: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    categoryBgColor: "bg-blue-100",
    categoryTextColor: "text-blue-600",
    type: "saida",
    amount: 89.5,
  },
  {
    id: "2",
    icon: Car,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    description: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    categoryBgColor: "bg-purple-100",
    categoryTextColor: "text-purple-600",
    type: "saida",
    amount: 100.0,
  },
  {
    id: "3",
    icon: ShoppingCart,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    description: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    categoryBgColor: "bg-orange-100",
    categoryTextColor: "text-orange-600",
    type: "saida",
    amount: 156.8,
  },
  {
    id: "4",
    icon: PiggyBank,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
    description: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    categoryBgColor: "bg-green-100",
    categoryTextColor: "text-green-600",
    type: "entrada",
    amount: 340.25,
  },
  {
    id: "5",
    icon: Tag,
    iconBgColor: "bg-amber-100",
    iconColor: "text-amber-500",
    description: "Aluguel",
    date: "26/11/25",
    category: "Utilidades",
    categoryBgColor: "bg-amber-100",
    categoryTextColor: "text-amber-600",
    type: "saida",
    amount: 1700.0,
  },
  {
    id: "6",
    icon: BriefcaseBusiness,
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-500",
    description: "Freelance",
    date: "24/11/25",
    category: "Salário",
    categoryBgColor: "bg-emerald-100",
    categoryTextColor: "text-emerald-600",
    type: "entrada",
    amount: 2500.0,
  },
  {
    id: "7",
    icon: ShoppingCart,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    description: "Compras Jantar",
    date: "22/11/25",
    category: "Mercado",
    categoryBgColor: "bg-orange-100",
    categoryTextColor: "text-orange-600",
    type: "saida",
    amount: 150.0,
  },
  {
    id: "8",
    icon: Ticket,
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-500",
    description: "Cinema",
    date: "18/12/25",
    category: "Entretenimento",
    categoryBgColor: "bg-pink-100",
    categoryTextColor: "text-pink-600",
    type: "saida",
    amount: 88.0,
  },
];

interface TransactionTableProps {
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function TransactionTable({ onDelete, onEdit }: TransactionTableProps) {
  const qtdItensTable = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockTransactions.length / qtdItensTable);
  const startIndex = (currentPage - 1) * qtdItensTable;
  const visibleTransactions = mockTransactions.slice(startIndex, startIndex + qtdItensTable);

  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-6 py-4">
              Descrição
            </th>
            <th className="text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Data
            </th>
            <th className="text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Categoria
            </th>
            <th className="text-left text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Tipo
            </th>
            <th className="text-right text-xs font-normal text-gray-400 uppercase tracking-wide px-4 py-4">
              Valor
            </th>
            <th className="text-right text-xs font-normal text-gray-400 uppercase tracking-wide px-6 py-4">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.map((tx, index) => (
            <tr
              key={tx.id}
              className={cn(
                "hover:bg-gray-50 transition-colors",
                index < visibleTransactions.length - 1 && "border-b border-gray-100"
              )}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg shrink-0", tx.iconBgColor)}>
                    <tx.icon size={16} className={tx.iconColor} />
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{tx.description}</span>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{tx.date}</td>

              <td className="px-4 py-4">
                <span
                  className={cn(
                    "text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap",
                    tx.categoryBgColor,
                    tx.categoryTextColor
                  )}
                >
                  {tx.category}
                </span>
              </td>

              <td className="px-4 py-4">
                {tx.type === "entrada" ? (
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

              <td className="px-4 py-4 text-right whitespace-nowrap">
                <span
                  className={cn(
                    "text-sm font-medium",
                    tx.type === "entrada" ? "text-gray-800" : "text-gray-800"
                  )}
                >
                  {tx.type === "entrada" ? "+" : "-"} R${" "}
                  {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </td>

              <td className="px-6 py-4">
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
                    onClick={() => onEdit?.(tx.id)}
                    className="text-gray-400 hover:text-gray-600 border-gray-200"
                  >
                    <SquarePen size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <span className="text-sm text-gray-500">
          {startIndex + 1} a {Math.min(startIndex + qtdItensTable, mockTransactions.length)} | {mockTransactions.length} resultados
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
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

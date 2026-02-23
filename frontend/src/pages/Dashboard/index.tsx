import { Page } from "@/components/Page";
import {
  Briefcase,
  Car,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  RefreshCw,
  ShoppingCart,
  Utensils,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const transactions = [
  {
    id: 1,
    name: "Pagamento de Salário",
    date: "01/12/25",
    category: "Receita",
    categoryColor: "bg-green-100 text-green-700",
    amount: "+ R$ 4.250,00",
    type: "income",
    icon: Briefcase,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    name: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentação",
    categoryColor: "bg-blue-100 text-blue-700",
    amount: "- R$ 89,50",
    type: "expense",
    icon: Utensils,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    name: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    categoryColor: "bg-purple-100 text-purple-700",
    amount: "- R$ 100,00",
    type: "expense",
    icon: Car,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    name: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    categoryColor: "bg-orange-100 text-orange-700",
    amount: "- R$ 156,80",
    type: "expense",
    icon: ShoppingCart,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 5,
    name: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    categoryColor: "bg-teal-100 text-teal-700",
    amount: "+ R$ 340,25",
    type: "income",
    icon: RefreshCw,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
];

const categories = [
  { name: "Alimentação", color: "bg-blue-100 text-blue-700", items: 12, amount: "R$ 542,30" },
  { name: "Transporte", color: "bg-purple-100 text-purple-700", items: 8, amount: "R$ 385,50" },
  { name: "Mercado", color: "bg-orange-100 text-orange-700", items: 3, amount: "R$ 298,75" },
  { name: "Entretenimento", color: "bg-pink-100 text-pink-700", items: 2, amount: "R$ 186,20" },
  { name: "Utilidades", color: "bg-amber-100 text-amber-800", items: 7, amount: "R$ 245,80" },
];

export function Dashboard() {
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
            <p className="mt-2 text-2xl font-semibold text-gray-800">R$ 12.847,32</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
              <CircleArrowUp size={16} className="text-green-500 mr-1" />
              Receitas do mês
            </p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">R$ 4.250,00</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="flex items-center gap-1 text-xs text-gray-500 uppercase">
              <CircleArrowDown size={16} className="text-red-500 mr-1" />
              Despesas do mês
            </p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">R$ 2.180,45</p>
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
              <Link to="/transactions" className="flex items-center gap-1 text-sm text-[#1F6F43] hover:text-[#1F6F43] font-normal">
                Ver todas <ChevronRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {transactions.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.id} className="flex items-center gap-4 px-6 py-6 hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <div className={`h-9 w-9 rounded-full ${t.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={t.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.date}</p>
                    </div>
                    <span className={`hidden sm:inline-flex text-xs font-medium px-3 py-1 rounded-full ${t.categoryColor}`}>
                      {t.category}
                    </span>
                    <div className="flex items-center gap-1 min-w-[120px] justify-end">
                      <span className={`text-sm font-medium ${t.type === "income" ? "text-gray-800" : "text-gray-800"}`}>
                        {t.amount}
                      </span>
                      {t.type === "income"
                        ? <CircleArrowUp size={16} className="text-green-500" />
                        : <CircleArrowDown size={16} className="text-red-500" />
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-6 py-4">
              <button className="flex items-center gap-1 text-sm text-[#1F6F43] hover:text-[#1F6F43] mx-auto font-normal">
                <Plus size={14} /> Nova transação
              </button>
            </div>
          </div>

          {/* Categorias — 1 coluna */}
          <div className="rounded-xl bg-white shadow-sm self-start">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="text-xs font-normal text-gray-500 uppercase tracking-wide">
                Categorias
              </span>
              <Link to="/categories" className="flex items-center gap-1 text-sm text-[#1F6F43] hover:text-[#1F6F43] font-normal">
                Gerenciar <ChevronRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center px-6 py-[16px] hover:bg-gray-50 transition-colors">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${cat.color}`}>
                    {cat.name}
                  </span>
                  <span className="ml-auto w-16 text-right text-xs text-gray-400">{cat.items} itens</span>
                  <span className="w-24 text-right text-sm font-semibold text-gray-800">{cat.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

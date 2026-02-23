import { Page } from "@/components/Page";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import { useQuery } from "@apollo/client/react";
import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { useState } from "react";
import { CreateTransactionDialog } from "../Transactions/components/CreateTransactionDialog";
import { DashboardCategories } from "./components/DashboardCategories";
import { DashboardRecentTransactions } from "./components/DashboardRecentTransactions";
import { DashboardSummaryCard } from "./components/DashboardSummaryCard";
import { formatCurrency, type Category, type Transaction } from "./dashboard.utils";

export function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  const { data: txData, refetch } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS);
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

  // Mostra as transações recentes, até 5, ordenadas pela data de criação
  const recentTransactions = [...allTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Mostra as categorias vinculadas, até 7, ordenadas pela quantidade de itens
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardSummaryCard
            icon={Wallet}
            iconColor="text-purple-500"
            label="Saldo total"
            value={formatCurrency(totalBalance)}
            valueColor={totalBalance >= 0 ? "text-gray-800" : "text-red-600"}
          />
          <DashboardSummaryCard
            icon={CircleArrowUp}
            iconColor="text-green-500"
            label="Receitas do mês"
            value={formatCurrency(monthlyIncome)}
          />
          <DashboardSummaryCard
            icon={CircleArrowDown}
            iconColor="text-red-500"
            label="Despesas do mês"
            value={formatCurrency(monthlyExpense)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardRecentTransactions
            transactions={recentTransactions}
            onNewTransaction={() => setOpenDialog(true)}
          />
          <DashboardCategories categories={categoriesData} />
        </div>
      </div>

      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSuccess={() => refetch()}
        categories={catData?.listCategories ?? []}
      />
    </Page>
  );
}

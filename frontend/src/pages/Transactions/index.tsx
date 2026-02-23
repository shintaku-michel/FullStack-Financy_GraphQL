import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import { useMutation, useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionTable, type Transaction } from "./components/TransactionTable";

interface Category {
  id: string;
  name: string;
}

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [categoria, setCategoria] = useState("todas");
  const [periodo, setPeriodo] = useState("");

  const { data: txData, loading: txLoading, error: txError, refetch } = useQuery<{ listTransactions: Transaction[] }>(LIST_TRANSACTIONS);
  const { data: catData } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  if (txError) console.error("[ListTransactions]", txError.message);

  const allTransactions = txData?.listTransactions ?? [];
  const categories = catData?.listCategories ?? [];

  const availablePeriods = Array.from(
    new Set(allTransactions.map((tx) => tx.createdAt.slice(0, 7)))
  ).sort().reverse();

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação excluída com sucesso!");
      refetch();
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const transactions = allTransactions
    .filter((tx) => !search || tx.description.toLowerCase().includes(search.toLowerCase()))
    .filter((tx) => tipo === "todos" || (tipo === "receita" ? tx.type === "INCOME" : tx.type === "EXPENSE"))
    .filter((tx) => categoria === "todas" || tx.category.id === categoria)
    .filter((tx) => !periodo || tx.createdAt.slice(0, 7) === periodo)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction);
    setOpenDialog(true);
  }

  function handleDelete(id: string) {
    deleteTransaction({ variables: { id } });
  }

  function handleDialogClose(open: boolean) {
    setOpenDialog(open);
    if (!open) setEditingTransaction(undefined);
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-xl text-semibold">Transações</Label>
            <p className="text-sm text-gray-500">Gerencie todas as suas transações financeiras</p>
          </div>
          <Button type="button" className="text-xs" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </div>

        <TransactionFilters
          search={search}
          tipo={tipo}
          categoria={categoria}
          periodo={periodo}
          categories={categories}
          availablePeriods={availablePeriods}
          onSearchChange={setSearch}
          onTipoChange={setTipo}
          onCategoriaChange={setCategoria}
          onPeriodoChange={setPeriodo}
        />

        <TransactionTable
          key={`${search}-${tipo}-${categoria}-${periodo}`}
          transactions={transactions}
          loading={txLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <CreateTransactionDialog
        key={editingTransaction?.id ?? "new"}
        open={openDialog}
        onOpenChange={handleDialogClose}
        onSuccess={() => refetch()}
        transaction={editingTransaction}
        categories={categories}
      />
    </Page>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client/react";
import { ChevronDown, CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type Transaction } from "./TransactionTable";

interface Category {
  id: string;
  name: string;
}

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  transaction?: Transaction;
  categories: Category[];
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onSuccess,
  transaction,
  categories,
}: CreateTransactionDialogProps) {
  const isEditing = !!transaction;

  const [type, setType] = useState<"despesa" | "receita">("despesa");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (transaction) {
      setType(transaction.type === "INCOME" ? "receita" : "despesa");
      setDescription(transaction.description);
      setAmount(String(transaction.amount));
      setCategoryId(transaction.category.id);
    }
  }, [transaction]);

  const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [LIST_CATEGORIES],
    onCompleted() {
      toast.success("Transação criada com sucesso!");
      onSuccess?.();
      onOpenChange(false);
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [LIST_CATEGORIES],
    onCompleted() {
      toast.success("Transação atualizada com sucesso!");
      onSuccess?.();
      onOpenChange(false);
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  const loading = creating || updating;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      description,
      amount: parseFloat(amount),
      type: type === "receita" ? "INCOME" : "EXPENSE",
      categoryId,
    };

    if (isEditing) {
      updateTransaction({ variables: { id: transaction!.id, data } });
    } else {
      createTransaction({ variables: { data } });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Editar transação" : "Nova transação"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Atualize os dados da transação" : "Registre sua despesa ou receita"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Tipo */}
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setType("despesa")}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors",
                type === "despesa"
                  ? "border border-[#DC2626] bg-white text-[#DC2626]"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <CircleArrowDown size={17} />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("receita")}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors",
                type === "receita"
                  ? "border border-[#1F6F43] bg-white text-[#1F6F43]"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <CircleArrowUp size={17} />
              Receita
            </button>
          </div>

          {/* Descrição */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              className="h-11 text-sm"
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Valor */}
          <div className="space-y-1.5">
            <Label htmlFor="amount">Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                R$
              </span>
              <Input
                className="h-11 pl-9 text-sm"
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-1.5">
            <Label htmlFor="category">Categoria</Label>
            <div className="relative">
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="flex h-11 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-8 py-2 text-sm text-gray-500 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#1F6F43] hover:bg-[#185836] text-white"
          >
            {loading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

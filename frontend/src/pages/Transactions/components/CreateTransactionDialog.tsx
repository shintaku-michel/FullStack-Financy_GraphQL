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
import { cn } from "@/lib/utils";
import { ChevronDown, CircleArrowDown, CircleArrowUp } from "lucide-react";
import { useState } from "react";

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CATEGORIES = [
  "Alimentação",
  "Entretenimento",
  "Investimento",
  "Mercado",
  "Salário",
  "Saúde",
  "Transporte",
  "Utilidades",
];

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateTransactionDialogProps) {
  const [type, setType] = useState<"despesa" | "receita">("despesa");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
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
              className="h-11"
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Data + Valor */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date">Data</Label>
              <Input
                className="h-11"
                id="date"
                type="date"
                placeholder="Selecione"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="amount">Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  R$
                </span>
                <Input
                  className="h-11 pl-9"
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-1.5">
            <Label htmlFor="category">Categoria</Label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-11 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-8 py-2 text-sm text-gray-500 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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
            className="w-full h-11 bg-[#1F6F43] hover:bg-[#185836] text-white"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

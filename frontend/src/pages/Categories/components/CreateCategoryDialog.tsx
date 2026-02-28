import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { useMutation } from "@apollo/client/react";
import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  Car,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  category?: Category;
}

const ICONS = [
  { key: "briefcaseBusiness", Icon: BriefcaseBusiness },
  { key: "car", Icon: Car },
  { key: "heartpulse", Icon: HeartPulse },
  { key: "piggybank", Icon: PiggyBank },
  { key: "cart", Icon: ShoppingCart },
  { key: "ticket", Icon: Ticket },
  { key: "toolcase", Icon: ToolCase },
  { key: "utensils", Icon: Utensils },
  { key: "pawprint", Icon: PawPrint },
  { key: "home", Icon: Home },
  { key: "gift", Icon: Gift },
  { key: "dumbbell", Icon: Dumbbell },
  { key: "book", Icon: BookOpen },
  { key: "baggageclaim", Icon: BaggageClaim },
  { key: "mailbox", Icon: Mailbox },
  { key: "receipttext", Icon: ReceiptText },
];

const COLORS = [
  { key: "green", value: "#16a34a" },
  { key: "blue", value: "#2563eb" },
  { key: "purple", value: "#9333ea" },
  { key: "pink", value: "#ec4899" },
  { key: "red", value: "#dc2626" },
  { key: "orange", value: "#ea580c" },
  { key: "amber", value: "#d97706" },
];

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onSuccess,
  category,
}: CreateCategoryDialogProps) {
  const isEditing = !!category;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("briefcaseBusiness");
  const [selectedColor, setSelectedColor] = useState("green");

  useEffect(() => {
    if (category) {
      setTitle(category.name);
      setDescription(category.description ?? "");
      setSelectedIcon(category.icon ?? "briefcaseBusiness");
      setSelectedColor(category.color ?? "green");
    } else {
      setTitle("");
      setDescription("");
      setSelectedIcon("briefcaseBusiness");
      setSelectedColor("green");
    }
  }, [category, open]);

  const [createCategory, { loading: creating }] = useMutation(CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso!");
      onOpenChange(false);
      onSuccess?.();
    },
    onError() {
      toast.error("Erro ao criar categoria.");
    },
  });

  const [updateCategory, { loading: updating }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria atualizada com sucesso!");
      onOpenChange(false);
      onSuccess?.();
    },
    onError() {
      toast.error("Erro ao atualizar categoria.");
    },
  });

  const loading = creating || updating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name: title, description, icon: selectedIcon, color: selectedColor };

    if (isEditing) {
      updateCategory({ variables: { id: category.id, data } });
    } else {
      createCategory({ variables: { data } });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Atualize os dados da categoria" : "Organize suas transações com categorias"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Título */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              disabled={loading}
              className="h-11 text-sm"
              id="title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Descrição */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Descrição</Label>
            <Input
              disabled={loading}
              className="h-11 text-sm"
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Opcional</p>
          </div>

          {/* Ícone */}
          <div className="space-y-2">
            <Label>Ícone</Label>
            <div className="grid grid-cols-8 gap-2 overflow-hidden">
              {ICONS.map(({ key, Icon }) => (
                <button
                  disabled={loading}
                  key={key}
                  type="button"
                  onClick={() => setSelectedIcon(key)}
                  className={`aspect-square w-full flex items-center justify-center rounded-lg border transition-colors
                    ${selectedIcon === key
                      ? "border border-emerald-700 bg-white"
                      : "border-gray-200 hover:border-emerald-700"
                    }`}
                >
                  <Icon size={18} className="text-gray-700" />
                </button>
              ))}
            </div>
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex items-center gap-4 px-1.5">
              {COLORS.map(({ key, value }) => (
                <button
                  disabled={loading}
                  key={key}
                  type="button"
                  onClick={() => setSelectedColor(key)}
                  style={{ backgroundColor: value }}
                  aria-label={key}
                  className={`h-6 w-6 lg:w-10 rounded-sm transition-all flex-1
                    ${selectedColor === key
                      ? "ring-1 ring-offset-4 ring-emerald-700"
                      : "opacity-80 hover:opacity-100 hover:ring-1 hover:ring-offset-4 hover:ring-emerald-700"
                    }`}
                />
              ))}
            </div>
          </div>

          <Button disabled={loading} type="submit" className="w-full h-10 bg-emerald-700 hover:bg-emerald-800 text-white">
            {isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

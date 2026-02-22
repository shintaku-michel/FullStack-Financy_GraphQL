import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useState } from "react";

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
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
}: CreateCategoryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("briefcase");
  const [selectedColor, setSelectedColor] = useState("green");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Nova categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Título */}
          <div className="space-y-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
            className="h-11"
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
              className="h-11"
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
            <div className="grid grid-cols-8 gap-2">
              {ICONS.map(({ key, Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedIcon(key)}
                  className={`h-10 w-10 flex items-center justify-center rounded-lg border transition-colors
                    ${selectedIcon === key
                      ? "border border-[#1F6F43] bg-white"
                      : "border-gray-200 hover:border-[#1F6F43]"
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
            <div className="flex items-center gap-4">
              {COLORS.map(({ key, value }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedColor(key)}
                  style={{ backgroundColor: value }}
                  className={`h-6 w-10 rounded-sm transition-all flex-1
                    ${selectedColor === key
                      ? "ring-1 ring-offset-4 ring-[#1F6F43]"
                      : "opacity-80 hover:opacity-100 hover:ring-1 hover:ring-offset-4 hover:ring-[#1F6F43]"
                    }`}
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full h-11 bg-[#1F6F43] hover:bg-[#185836] text-white">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

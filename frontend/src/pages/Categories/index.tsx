import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ArrowUpDown,
  BriefcaseBusiness,
  Car,
  HeartPulse,
  PiggyBank,
  Plus,
  ShoppingCart,
  Tag,
  Ticket,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { CategoryCard } from "./components/CategoryCard";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";

const mockCategories = [
  {
    id: "1",
    icon: Utensils,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    name: "Alimentação",
    description: "Restaurantes, delivery e refeições",
    badgeBgColor: "bg-blue-100",
    badgeTextColor: "text-blue-600",
    itemCount: 12,
  },
  {
    id: "2",
    icon: Ticket,
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-500",
    name: "Entretenimento",
    description: "Cinema, jogos e lazer",
    badgeBgColor: "bg-pink-100",
    badgeTextColor: "text-pink-600",
    itemCount: 2,
  },
  {
    id: "3",
    icon: PiggyBank,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
    name: "Investimento",
    description: "Aplicações e retornos financeiros",
    badgeBgColor: "bg-green-100",
    badgeTextColor: "text-green-600",
    itemCount: 1,
  },
  {
    id: "4",
    icon: ShoppingCart,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
    name: "Mercado",
    description: "Compras de supermercado e mantimentos",
    badgeBgColor: "bg-orange-100",
    badgeTextColor: "text-orange-600",
    itemCount: 3,
  },
  {
    id: "5",
    icon: BriefcaseBusiness,
    iconBgColor: "bg-emerald-100",
    iconColor: "text-emerald-500",
    name: "Salário",
    description: "Renda mensal e bonificações",
    badgeBgColor: "bg-emerald-100",
    badgeTextColor: "text-emerald-600",
    itemCount: 3,
  },
  {
    id: "6",
    icon: HeartPulse,
    iconBgColor: "bg-red-100",
    iconColor: "text-red-500",
    name: "Saúde",
    description: "Medicamentos, consultas e exames",
    badgeBgColor: "bg-red-100",
    badgeTextColor: "text-red-600",
    itemCount: 0,
  },
  {
    id: "7",
    icon: Car,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-500",
    name: "Transporte",
    description: "Gasolina, transporte público e viagens",
    badgeBgColor: "bg-purple-100",
    badgeTextColor: "text-purple-600",
    itemCount: 8,
  },
  {
    id: "8",
    icon: Tag,
    iconBgColor: "bg-amber-100",
    iconColor: "text-amber-500",
    name: "Utilidades",
    description: "Energia, água, internet e telefone",
    badgeBgColor: "bg-amber-100",
    badgeTextColor: "text-amber-600",
    itemCount: 7,
  },
];

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>  
            <Label className="text-xl text-semibold">Categorias</Label>
            <p className="text-sm text-gray-500">Organize suas transações por categorias</p>
          </div>
          <Button type="submit" className="text-xs" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Tag size={22} className="text-gray-500 mt-1" />
              <div className="flex flex-col items-start">
                <p className="text-xl font-semibold text-gray-800">8</p>
                <p className="text-xs text-gray-500 uppercase">Total de categorias</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <ArrowUpDown size={22} className="text-[#9333EA] mt-1" />
              <div className="flex flex-col items-start">
                <p className="text-xl font-semibold text-gray-800">8</p>
                <p className="text-xs text-gray-500 uppercase">Total de transações</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <Utensils size={22} className="text-[#2563EB] mt-1" />
              <div className="flex flex-col items-start">
                <p className="text-xl font-semibold text-gray-800">Alimentação</p>
                <p className="text-xs text-gray-500 uppercase">Categoria mais utilizada</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              iconBgColor={category.iconBgColor}
              iconColor={category.iconColor}
              name={category.name}
              description={category.description}
              badgeBgColor={category.badgeBgColor}
              badgeTextColor={category.badgeTextColor}
              itemCount={category.itemCount}
              onDelete={() => console.log("delete", category.id)}
              onEdit={() => console.log("edit", category.id)}
            />
          ))}
        </div>
      </div>

      <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Page>
  );
}
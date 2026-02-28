import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { COLOR_MAP, DEFAULT_COLORS, DEFAULT_ICON, ICON_MAP } from "@/lib/categoryMaps";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { useMutation, useQuery } from "@apollo/client/react";
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryCard } from "./components/CategoryCard";
import { CategoryIndicator } from "./components/CategoryIndicator";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  transactionCount?: number;
  createdAt: string;
}

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  const { data, loading, error, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  if (error) console.error("[ListCategories]", error.message);

  const categories = [...(data?.listCategories ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalTransactions = categories.reduce((sum, cat) => sum + (cat.transactionCount ?? 0), 0);
  const mostUsed = categories.reduce<Category | undefined>(
    (top, cat) => ((cat.transactionCount ?? 0) > (top?.transactionCount ?? 0) ? cat : top),
    undefined
  );

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria excluída com sucesso!");
      refetch();
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setOpenDialog(true);
  }

  function handleDelete(id: string) {
    deleteCategory({ variables: { id } });
  }

  function handleDialogClose(open: boolean) {
    setOpenDialog(open);
    if (!open) setEditingCategory(undefined);
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
          <div>
            <Label className="text-xl text-semibold">Categorias</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">Organize suas transações por categorias</p>
          </div>
          <Button type="button" className="text-xs w-full lg:w-auto" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6">
          <CategoryIndicator
            icon={Tag}
            iconColor="text-gray-500"
            value={categories.length}
            label="Total de categorias"
          />
          <CategoryIndicator
            icon={ArrowUpDown}
            iconColor="text-[#9333EA]"
            value={totalTransactions}
            label="Total de transações"
          />
          <CategoryIndicator
            icon={Utensils}
            iconColor="text-[#2563EB]"
            value={mostUsed?.name ?? "—"}
            label="Categoria mais utilizada"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {loading && (
            <p className="col-span-4 text-center text-sm text-gray-400 dark:text-gray-500">Carregando...</p>
          )}
          {categories.map((category) => {
            const icon = ICON_MAP[category.icon ?? ""] ?? DEFAULT_ICON;
            const colors = COLOR_MAP[category.color ?? ""] ?? DEFAULT_COLORS;
            return (
              <CategoryCard
                key={category.id}
                icon={icon}
                iconBgColor={colors.iconBg}
                iconColor={colors.iconColor}
                name={category.name}
                description={category.description ?? ""}
                badgeBgColor={colors.badgeBg}
                badgeTextColor={colors.badgeText}
                itemCount={category.transactionCount ?? 0}
                onEdit={() => handleEdit(category)}
                onDelete={() => handleDelete(category.id)}
              />
            );
          })}
        </div>
      </div>

      <CreateCategoryDialog
        key={editingCategory?.id ?? "new"}
        open={openDialog}
        onOpenChange={handleDialogClose}
        onSuccess={() => refetch()}
        category={editingCategory}
      />
    </Page>
  );
}

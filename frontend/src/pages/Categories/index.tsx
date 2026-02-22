import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label>Nome da Categoria</Label>
          <Button type="submit" className="text-xs" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>
      </div>

      <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Page>
  );
}
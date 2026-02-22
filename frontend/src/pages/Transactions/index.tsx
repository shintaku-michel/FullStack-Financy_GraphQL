import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { CreateCategoryDialog } from "../Categories/components/CreateCategoryDialog";
import { TransactionTable } from "./components/TransactionTable";

const selectClass =
  "flex h-10 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-8 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [categoria, setCategoria] = useState("todas");
  const [periodo, setPeriodo] = useState("2026-02");

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>  
            <Label className="text-xl text-semibold">Transações</Label>
            <p className="text-sm text-gray-500">Gerencie todas as suas transações financeiras</p>
          </div>
          <Button type="submit" className="text-xs" onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex flex-row items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-xs text-muted-foreground">Buscar</Label>
                <div className="relative mt-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="search"
                    className="h-10 pl-9"
                    placeholder="Buscar por descrição"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1">
                <Label htmlFor="tipo" className="text-xs text-muted-foreground">Tipo</Label>
                <div className="relative mt-1">
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className={selectClass}
                  >
                    <option value="todos">Todos</option>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex-1">
                <Label htmlFor="categoria" className="text-xs text-muted-foreground">Categoria</Label>
                <div className="relative mt-1">
                  <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className={selectClass}
                  >
                    <option value="todas">Todas</option>
                    <option value="alimentacao">Alimentação</option>
                    <option value="entretenimento">Entretenimento</option>
                    <option value="investimento">Investimento</option>
                    <option value="mercado">Mercado</option>
                    <option value="salario">Salário</option>
                    <option value="saude">Saúde</option>
                    <option value="transporte">Transporte</option>
                    <option value="utilidades">Utilidades</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="flex-1">
                <Label htmlFor="periodo" className="text-xs text-muted-foreground">Período</Label>
                <div className="relative mt-1">
                  <select
                    id="periodo"
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className={selectClass}
                  >
                    <option value="2025-10">Outubro / 2025</option>
                    <option value="2025-11">Novembro / 2025</option>
                    <option value="2025-12">Dezembro / 2025</option>
                    <option value="2026-01">Janeiro / 2026</option>
                    <option value="2026-02">Fevereiro / 2026</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <TransactionTable
          onDelete={(id) => console.log("delete", id)}
          onEdit={(id) => console.log("edit", id)}
        />
      </div>

      <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} />
    </Page>
  );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Search } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface TransactionFiltersProps {
  search: string;
  tipo: string;
  categoria: string;
  periodo: string;
  categories: Category[];
  availablePeriods: string[];
  onSearchChange: (value: string) => void;
  onTipoChange: (value: string) => void;
  onCategoriaChange: (value: string) => void;
  onPeriodoChange: (value: string) => void;
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const selectClass =
  "flex h-10 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-8 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function TransactionFilters({
  search,
  tipo,
  categoria,
  periodo,
  categories,
  availablePeriods,
  onSearchChange,
  onTipoChange,
  onCategoriaChange,
  onPeriodoChange,
}: TransactionFiltersProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex flex-row items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-xs text-muted-foreground">Buscar</Label>
          <div className="relative mt-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              id="search"
              className="h-10 pl-9"
              placeholder="Buscar por descrição"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1">
          <Label htmlFor="tipo" className="text-xs text-muted-foreground">Tipo</Label>
          <div className="relative mt-1">
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => onTipoChange(e.target.value)}
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
              onChange={(e) => onCategoriaChange(e.target.value)}
              className={selectClass}
            >
              <option value="todas">Todas</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
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
              onChange={(e) => onPeriodoChange(e.target.value)}
              className={selectClass}
            >
              <option value="">Todos</option>
              {availablePeriods.map((p) => {
                const [year, month] = p.split("-");
                return (
                  <option key={p} value={p}>
                    {MONTHS[Number(month) - 1]} / {year}
                  </option>
                );
              })}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

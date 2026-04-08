import Link from "next/link";

type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
};

export default function CrudTable<T extends { id: number }>({
  rows,
  columns,
  createHref,
  editHref,
  onDelete,
}: Readonly<{
  rows: T[];
  columns: Column<T>[];
  createHref: string;
  editHref: (id: number) => string;
  onDelete: (id: number) => Promise<void>;
}>) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-semibold">Registros</h2>
        <Link href={createHref} className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
          Novo
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-2 font-medium">
                  {column.label}
                </th>
              ))}
              <th className="px-3 py-2 font-medium">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-2">
                    {column.render(row)}
                  </td>
                ))}
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={editHref(row.id)} className="rounded-md border px-2 py-1 hover:bg-muted">
                      Editar
                    </Link>
                    <form action={onDelete.bind(null, row.id)}>
                      <button type="submit" className="rounded-md border px-2 py-1 text-destructive hover:bg-muted">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

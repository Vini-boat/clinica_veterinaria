import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <Card className="gap-0 py-0">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle>Registros</CardTitle>
        <Button asChild>
          <Link href={createHref}>Novo</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>
                  {column.label}
                </TableHead>
              ))}
              <TableHead>Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render(row)}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={editHref(row.id)}>Editar</Link>
                    </Button>
                    <form action={onDelete.bind(null, row.id)}>
                      <Button type="submit" variant="destructive" size="sm">
                        Excluir
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

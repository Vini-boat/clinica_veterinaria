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
import ClickableTableRow from "./clickable-table-row";

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
}: Readonly<{
  rows: T[];
  columns: Column<T>[];
  createHref: string;
  editHref: (id: number) => string;
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <ClickableTableRow key={row.id} href={editHref(row.id)}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </ClickableTableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

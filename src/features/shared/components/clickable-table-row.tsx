"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { TableRow } from "@/components/ui/table";

export default function ClickableTableRow({
  href,
  children,
}: Readonly<{
  href: string;
  children: ReactNode;
}>) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer transition-colors hover:bg-muted/50"
      role="link"
      tabIndex={0}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
    >
      {children}
    </TableRow>
  );
}
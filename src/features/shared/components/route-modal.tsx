"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export default function RouteModal({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description?: string;
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <Dialog defaultOpen open onOpenChange={(isOpen) => !isOpen && router.back()}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogHeader className="p-5 pb-4">
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <Separator />
        <div className="max-h-[80vh] overflow-y-auto p-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

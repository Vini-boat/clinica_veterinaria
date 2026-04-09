"use client";

import { useMemo, useState } from "react";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type MultiSelectOption = {
  id: number;
  label: string;
};

export default function SearchableMultiSelect({
  options,
  selectedIds,
  onSelectionChange,
  placeholder,
  searchPlaceholder,
  emptySearchText,
  emptySelectionText,
}: Readonly<{
  options: MultiSelectOption[];
  selectedIds: number[];
  onSelectionChange: (next: number[]) => void;
  placeholder: string;
  searchPlaceholder: string;
  emptySearchText: string;
  emptySelectionText: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const collator = useMemo(() => new Intl.Collator("pt-BR", { sensitivity: "base" }), []);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const orderedOptions = useMemo(() => {
    return [...options].sort((optionA, optionB) => {
      const isOptionASelected = selectedSet.has(optionA.id);
      const isOptionBSelected = selectedSet.has(optionB.id);

      if (isOptionASelected !== isOptionBSelected) {
        return isOptionASelected ? -1 : 1;
      }

      return collator.compare(optionA.label, optionB.label);
    });
  }, [collator, options, selectedSet]);

  const selectedOptions = useMemo(
    () =>
      options
        .filter((option) => selectedSet.has(option.id))
        .sort((optionA, optionB) => collator.compare(optionA.label, optionB.label)),
    [collator, options, selectedSet],
  );

  const toggleOption = (id: number) => {
    if (selectedSet.has(id)) {
      onSelectionChange(selectedIds.filter((currentId) => currentId !== id));
      return;
    }

    onSelectionChange(Array.from(new Set([...selectedIds, id])));
  };

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="w-full justify-between">
            <span className={cn("truncate text-left", selectedIds.length === 0 && "text-muted-foreground")}>
              {selectedIds.length > 0 ? `${selectedIds.length} selecionado(s)` : placeholder}
            </span>
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptySearchText}</CommandEmpty>
              <CommandGroup>
                {orderedOptions.map((option) => {
                  const isSelected = selectedSet.has(option.id);

                  return (
                    <CommandItem
                      key={option.id}
                      value={option.label}
                      onSelect={() => toggleOption(option.id)}
                      data-checked={isSelected}
                      className={cn(isSelected && "bg-muted/60")}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedOptions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <Badge key={option.id} variant="secondary" className="h-auto gap-1 py-1 pr-1">
              <span className="max-w-48 truncate">{option.label}</span>
              <button
                type="button"
                onClick={() => toggleOption(option.id)}
                className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                aria-label={`Remover ${option.label}`}
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{emptySelectionText}</p>
      )}
    </div>
  );
}
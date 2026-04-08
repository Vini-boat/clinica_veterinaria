export function selectedValuesAsNumbers(options: HTMLOptionsCollection): number[] {
  const ids: number[] = [];

  for (const option of Array.from(options)) {
    if (option.selected) {
      const parsed = Number(option.value);
      if (Number.isFinite(parsed)) {
        ids.push(parsed);
      }
    }
  }

  return ids;
}

export function toNullableNumber(value: string): number | null {
  if (!value.trim()) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

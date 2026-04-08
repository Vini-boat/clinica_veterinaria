import { z } from "zod";

export const medicamentoSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do medicamento"),
});

export type MedicamentoFormValues = z.infer<typeof medicamentoSchema>;

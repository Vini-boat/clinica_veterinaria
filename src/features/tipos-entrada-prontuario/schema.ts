import { z } from "zod";

export const tipoEntradaProntuarioSchema = z.object({
  nome: z.string().trim().min(2, "Informe o tipo de entrada"),
});

export type TipoEntradaProntuarioFormValues = z.infer<typeof tipoEntradaProntuarioSchema>;

import { z } from "zod";

export const tipoEspecieSchema = z.object({
  especie: z.string().trim().min(2, "Informe a especie"),
  raca: z.string().trim().min(2, "Informe a raca"),
});

export type TipoEspecieFormValues = z.infer<typeof tipoEspecieSchema>;

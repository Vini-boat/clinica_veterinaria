import { z } from "zod";

export const entradaProntuarioSchema = z.object({
  id_animal: z.number().int().positive("Selecione o animal"),
  id_tipo_entrada_prontuario: z.number().int().positive("Selecione o tipo de entrada"),
  data_hora: z.string().min(1, "Informe data e hora"),
  observacao: z.string().trim().min(1, "Informe observacoes"),
  medicamentos: z.array(z.number().int().positive()),
  funcionarios: z.array(z.number().int().positive()),
});

export type EntradaProntuarioFormValues = z.infer<typeof entradaProntuarioSchema>;

import { z } from "zod";

export const animalSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do animal"),
  id_cliente: z.number().int().positive("Selecione o cliente dono"),
  id_tipo_especie: z.number().int().positive("Selecione a especie/raca"),
  sexo: z.enum(["Macho", "Femea"]).nullable(),
  porte: z.enum(["Pequeno", "Medio", "Grande"]).nullable(),
  idade: z.number().int().nonnegative().nullable(),
  peso_gramas: z.number().int().nonnegative().nullable(),
  observacao: z.string().trim().optional(),
});

export type AnimalFormValues = z.infer<typeof animalSchema>;

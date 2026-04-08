import { z } from "zod";

export const clienteSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do cliente"),
  cpf: z.string().trim().min(11, "CPF invalido"),
  telefone: z.string().trim().optional(),
  endereco: z.string().trim().optional(),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;

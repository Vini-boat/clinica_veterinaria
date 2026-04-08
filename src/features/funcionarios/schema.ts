import { z } from "zod";

export const funcionarioSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome do funcionario"),
  cpf: z.string().trim().min(11, "CPF invalido"),
  telefone: z.string().trim().optional(),
  endereco: z.string().trim().optional(),
});

export type FuncionarioFormValues = z.infer<typeof funcionarioSchema>;

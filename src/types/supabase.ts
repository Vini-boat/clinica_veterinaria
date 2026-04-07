export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      animal: {
        Row: {
          id_animal: number
          id_cliente: number | null
          id_tipo_especie: number | null
          idade: number | null
          nome: string | null
          observacao: string | null
          peso_gramas: number | null
          porte: Database["public"]["Enums"]["porte"] | null
          sexo: Database["public"]["Enums"]["sexo"] | null
        }
        Insert: {
          id_animal?: number
          id_cliente?: number | null
          id_tipo_especie?: number | null
          idade?: number | null
          nome?: string | null
          observacao?: string | null
          peso_gramas?: number | null
          porte?: Database["public"]["Enums"]["porte"] | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
        }
        Update: {
          id_animal?: number
          id_cliente?: number | null
          id_tipo_especie?: number | null
          idade?: number | null
          nome?: string | null
          observacao?: string | null
          peso_gramas?: number | null
          porte?: Database["public"]["Enums"]["porte"] | null
          sexo?: Database["public"]["Enums"]["sexo"] | null
        }
        Relationships: [
          {
            foreignKeyName: "animal_idcliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "animal_idtipoespecie_fkey"
            columns: ["id_tipo_especie"]
            isOneToOne: false
            referencedRelation: "tipo_especie"
            referencedColumns: ["id_tipo_especie"]
          },
        ]
      }
      aplicacao: {
        Row: {
          data_hora: string | null
          dose: number | null
          id_aplicacao: number
          id_entrada_prontuario: number | null
          id_medicamento: number | null
        }
        Insert: {
          data_hora?: string | null
          dose?: number | null
          id_aplicacao?: number
          id_entrada_prontuario?: number | null
          id_medicamento?: number | null
        }
        Update: {
          data_hora?: string | null
          dose?: number | null
          id_aplicacao?: number
          id_entrada_prontuario?: number | null
          id_medicamento?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "aplicacao_identradaprontuario_fkey"
            columns: ["id_entrada_prontuario"]
            isOneToOne: false
            referencedRelation: "entrada_prontuario"
            referencedColumns: ["id_entrada_prontuario"]
          },
          {
            foreignKeyName: "aplicacao_idmedicamento_fkey"
            columns: ["id_medicamento"]
            isOneToOne: false
            referencedRelation: "medicamento"
            referencedColumns: ["id_medicamento"]
          },
        ]
      }
      cliente: {
        Row: {
          cpf: string
          endereco: string | null
          id_cliente: number
          nome: string | null
          telefone: string | null
        }
        Insert: {
          cpf: string
          endereco?: string | null
          id_cliente?: number
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          cpf?: string
          endereco?: string | null
          id_cliente?: number
          nome?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      entrada_prontuario: {
        Row: {
          data_hora: string | null
          id_animal: number | null
          id_entrada_prontuario: number
          id_tipo_entrada_prontuario: number | null
          observacao: string | null
        }
        Insert: {
          data_hora?: string | null
          id_animal?: number | null
          id_entrada_prontuario?: number
          id_tipo_entrada_prontuario?: number | null
          observacao?: string | null
        }
        Update: {
          data_hora?: string | null
          id_animal?: number | null
          id_entrada_prontuario?: number
          id_tipo_entrada_prontuario?: number | null
          observacao?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entradaprontuario_idanimal_fkey"
            columns: ["id_animal"]
            isOneToOne: false
            referencedRelation: "animal"
            referencedColumns: ["id_animal"]
          },
          {
            foreignKeyName: "entradaprontuario_idtipoentradaprontuario_fkey"
            columns: ["id_tipo_entrada_prontuario"]
            isOneToOne: false
            referencedRelation: "tipo_entrada_prontuario"
            referencedColumns: ["id_tipo_entrada_prontuario"]
          },
        ]
      }
      funcionario: {
        Row: {
          cpf: string
          endereco: string | null
          id_funcionario: number
          nome: string | null
          telefone: string | null
        }
        Insert: {
          cpf: string
          endereco?: string | null
          id_funcionario?: number
          nome?: string | null
          telefone?: string | null
        }
        Update: {
          cpf?: string
          endereco?: string | null
          id_funcionario?: number
          nome?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      medicamento: {
        Row: {
          id_medicamento: number
          nome: string | null
        }
        Insert: {
          id_medicamento?: number
          nome?: string | null
        }
        Update: {
          id_medicamento?: number
          nome?: string | null
        }
        Relationships: []
      }
      participa: {
        Row: {
          id_entrada_prontuario: number | null
          id_funcionario: number | null
          id_participa: number
        }
        Insert: {
          id_entrada_prontuario?: number | null
          id_funcionario?: number | null
          id_participa?: number
        }
        Update: {
          id_entrada_prontuario?: number | null
          id_funcionario?: number | null
          id_participa?: number
        }
        Relationships: [
          {
            foreignKeyName: "participa_identradaprontuario_fkey"
            columns: ["id_entrada_prontuario"]
            isOneToOne: false
            referencedRelation: "entrada_prontuario"
            referencedColumns: ["id_entrada_prontuario"]
          },
          {
            foreignKeyName: "participa_idfuncionario_fkey"
            columns: ["id_funcionario"]
            isOneToOne: false
            referencedRelation: "funcionario"
            referencedColumns: ["id_funcionario"]
          },
        ]
      }
      tipo_entrada_prontuario: {
        Row: {
          id_tipo_entrada_prontuario: number
          nome: string | null
        }
        Insert: {
          id_tipo_entrada_prontuario?: number
          nome?: string | null
        }
        Update: {
          id_tipo_entrada_prontuario?: number
          nome?: string | null
        }
        Relationships: []
      }
      tipo_especie: {
        Row: {
          especie: string | null
          id_tipo_especie: number
          raca: string | null
        }
        Insert: {
          especie?: string | null
          id_tipo_especie?: number
          raca?: string | null
        }
        Update: {
          especie?: string | null
          id_tipo_especie?: number
          raca?: string | null
        }
        Relationships: []
      }
      veterinario: {
        Row: {
          crmv: number
          especialidade: string | null
          id_funcionario: number
          id_veterinario: number
        }
        Insert: {
          crmv: number
          especialidade?: string | null
          id_funcionario: number
          id_veterinario?: number
        }
        Update: {
          crmv?: number
          especialidade?: string | null
          id_funcionario?: number
          id_veterinario?: number
        }
        Relationships: [
          {
            foreignKeyName: "veterinario_idfuncionario_fkey"
            columns: ["id_funcionario"]
            isOneToOne: true
            referencedRelation: "funcionario"
            referencedColumns: ["id_funcionario"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      porte: "Pequeno" | "Medio" | "Grande"
      sexo: "Macho" | "Femea"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      porte: ["Pequeno", "Medio", "Grande"],
      sexo: ["Macho", "Femea"],
    },
  },
} as const

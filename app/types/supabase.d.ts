export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      document_demand: {
        Row: {
          created_at: string | null
          document_number: string
          id: number
          name: string
          note: string | null
          site: Database['public']['Enums']['demand_site']
          status: Database['public']['Enums']['demand_status']
          type: Database['public']['Enums']['demand_type'] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_number: string
          id?: number
          name?: string
          note?: string | null
          site: Database['public']['Enums']['demand_site']
          status?: Database['public']['Enums']['demand_status']
          type?: Database['public']['Enums']['demand_type'] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_number?: string
          id?: number
          name?: string
          note?: string | null
          site?: Database['public']['Enums']['demand_site']
          status?: Database['public']['Enums']['demand_status']
          type?: Database['public']['Enums']['demand_type'] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      document_status_history: {
        Row: {
          changed_at: string
          changed_by: string | null
          document_demand_id: number
          id: number
          new_status: Database['public']['Enums']['demand_status']
          old_status: Database['public']['Enums']['demand_status']
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          document_demand_id: number
          id?: number
          new_status: Database['public']['Enums']['demand_status']
          old_status: Database['public']['Enums']['demand_status']
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          document_demand_id?: number
          id?: number
          new_status?: Database['public']['Enums']['demand_status']
          old_status?: Database['public']['Enums']['demand_status']
        }
        Relationships: [
          {
            foreignKeyName: 'document_status_history_document_demand_id_fkey'
            columns: ['document_demand_id']
            isOneToOne: false
            referencedRelation: 'document_demand'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      demand_site: '1062-9' | '1342-5'
      demand_status: 'new' | 'consulted' | 'released' | 'issued' | 'error'
      demand_type: '1cin' | '2cin' | '1v' | '2v' | '2vt' | '1ve' | '2ve'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

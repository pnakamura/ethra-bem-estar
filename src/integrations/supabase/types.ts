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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string | null
          admin_user_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string | null
          target_email: string | null
          target_user_id: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          admin_user_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          target_email?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          admin_user_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          target_email?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      breathing_sessions: {
        Row: {
          completed_at: string
          cycles_completed: number
          duration_ms: number
          emotion_entry_id: string | null
          id: string
          technique_id: string | null
          technique_name: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          cycles_completed?: number
          duration_ms?: number
          emotion_entry_id?: string | null
          id?: string
          technique_id?: string | null
          technique_name: string
          user_id: string
        }
        Update: {
          completed_at?: string
          cycles_completed?: number
          duration_ms?: number
          emotion_entry_id?: string | null
          id?: string
          technique_id?: string | null
          technique_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "breathing_sessions_emotion_entry_id_fkey"
            columns: ["emotion_entry_id"]
            isOneToOne: false
            referencedRelation: "emotion_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breathing_sessions_technique_id_fkey"
            columns: ["technique_id"]
            isOneToOne: false
            referencedRelation: "breathing_techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      breathing_techniques: {
        Row: {
          access_level: string | null
          background_audio_url: string | null
          bg_class: string | null
          color_class: string | null
          created_at: string | null
          created_by: string | null
          cycles: number
          deleted_at: string | null
          description: string
          display_order: number | null
          emotion_id: string
          exhale_ms: number
          explanation: string | null
          hold_in_ms: number
          hold_out_ms: number
          icon: string | null
          id: string
          inhale_ms: number
          is_active: boolean | null
          is_special_technique: boolean | null
          label: string
          pattern_description: string | null
          pattern_name: string
          special_config: Json | null
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          background_audio_url?: string | null
          bg_class?: string | null
          color_class?: string | null
          created_at?: string | null
          created_by?: string | null
          cycles?: number
          deleted_at?: string | null
          description: string
          display_order?: number | null
          emotion_id: string
          exhale_ms?: number
          explanation?: string | null
          hold_in_ms?: number
          hold_out_ms?: number
          icon?: string | null
          id?: string
          inhale_ms?: number
          is_active?: boolean | null
          is_special_technique?: boolean | null
          label: string
          pattern_description?: string | null
          pattern_name: string
          special_config?: Json | null
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          background_audio_url?: string | null
          bg_class?: string | null
          color_class?: string | null
          created_at?: string | null
          created_by?: string | null
          cycles?: number
          deleted_at?: string | null
          description?: string
          display_order?: number | null
          emotion_id?: string
          exhale_ms?: number
          explanation?: string | null
          hold_in_ms?: number
          hold_out_ms?: number
          icon?: string | null
          id?: string
          inhale_ms?: number
          is_active?: boolean | null
          is_special_technique?: boolean | null
          label?: string
          pattern_description?: string | null
          pattern_name?: string
          special_config?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      categorias_refeicao: {
        Row: {
          descricao: string | null
          id: string
          nome: string
          ordem: number | null
        }
        Insert: {
          descricao?: string | null
          id?: string
          nome: string
          ordem?: number | null
        }
        Update: {
          descricao?: string | null
          id?: string
          nome?: string
          ordem?: number | null
        }
        Relationships: []
      }
      dependentes: {
        Row: {
          atualizado_em: string | null
          celular: string | null
          criado_em: string | null
          deletado_em: string | null
          email: string
          id: string
          nome_completo: string
          usuario_id: string
        }
        Insert: {
          atualizado_em?: string | null
          celular?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          email: string
          id?: string
          nome_completo: string
          usuario_id: string
        }
        Update: {
          atualizado_em?: string | null
          celular?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          email?: string
          id?: string
          nome_completo?: string
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dependentes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      emotion_entries: {
        Row: {
          created_at: string
          detected_dyads: Json | null
          free_text: string | null
          id: string
          recommended_treatment: Json | null
          selected_emotions: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          detected_dyads?: Json | null
          free_text?: string | null
          id?: string
          recommended_treatment?: Json | null
          selected_emotions?: Json
          user_id: string
        }
        Update: {
          created_at?: string
          detected_dyads?: Json | null
          free_text?: string | null
          id?: string
          recommended_treatment?: Json | null
          selected_emotions?: Json
          user_id?: string
        }
        Relationships: []
      }
      emotion_nutrition_context: {
        Row: {
          created_at: string
          energy_after: string | null
          hunger_type: string
          id: string
          meal_category: string | null
          mindful_eating_notes: string | null
          mood_before: string
          nutrition_entry_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          energy_after?: string | null
          hunger_type?: string
          id?: string
          meal_category?: string | null
          mindful_eating_notes?: string | null
          mood_before: string
          nutrition_entry_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          energy_after?: string | null
          hunger_type?: string
          id?: string
          meal_category?: string | null
          mindful_eating_notes?: string | null
          mood_before?: string
          nutrition_entry_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emotion_nutrition_context_nutrition_entry_id_fkey"
            columns: ["nutrition_entry_id"]
            isOneToOne: false
            referencedRelation: "informacoes_nutricionais"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_access_levels: {
        Row: {
          category: string
          created_at: string | null
          feature_description: string | null
          feature_key: string
          feature_name: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          category: string
          created_at?: string | null
          feature_description?: string | null
          feature_key: string
          feature_name: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          category?: string
          created_at?: string | null
          feature_description?: string | null
          feature_key?: string
          feature_name?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      gamification_user_stats: {
        Row: {
          conquistas_desbloqueadas: Json | null
          created_at: string | null
          id: string
          maior_sequencia: number | null
          nivel: number | null
          sequencia_atual: number | null
          total_checkins_emocao: number | null
          total_entradas_diario: number | null
          total_minutos_meditacao: number | null
          total_pontos: number | null
          total_sessoes_respiracao: number | null
          ultima_atividade: string | null
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          conquistas_desbloqueadas?: Json | null
          created_at?: string | null
          id?: string
          maior_sequencia?: number | null
          nivel?: number | null
          sequencia_atual?: number | null
          total_checkins_emocao?: number | null
          total_entradas_diario?: number | null
          total_minutos_meditacao?: number | null
          total_pontos?: number | null
          total_sessoes_respiracao?: number | null
          ultima_atividade?: string | null
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          conquistas_desbloqueadas?: Json | null
          created_at?: string | null
          id?: string
          maior_sequencia?: number | null
          nivel?: number | null
          sequencia_atual?: number | null
          total_checkins_emocao?: number | null
          total_entradas_diario?: number | null
          total_minutos_meditacao?: number | null
          total_pontos?: number | null
          total_sessoes_respiracao?: number | null
          ultima_atividade?: string | null
          updated_at?: string | null
          usuario_id?: string
        }
        Relationships: []
      }
      guide_conversations: {
        Row: {
          created_at: string | null
          guide_id: string
          id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          guide_id: string
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          guide_id?: string
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_conversations_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "spiritual_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "guide_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      informacoes_nutricionais: {
        Row: {
          calorias: number | null
          carboidratos: number | null
          categoria_refeicao_id: string | null
          dados_n8n: Json | null
          dados_raw_ia: Json | null
          data_registro: string | null
          deletado_em: string | null
          descricao_ia: string | null
          gorduras: number | null
          id: string
          proteinas: number | null
          usuario_id: string
        }
        Insert: {
          calorias?: number | null
          carboidratos?: number | null
          categoria_refeicao_id?: string | null
          dados_n8n?: Json | null
          dados_raw_ia?: Json | null
          data_registro?: string | null
          deletado_em?: string | null
          descricao_ia?: string | null
          gorduras?: number | null
          id?: string
          proteinas?: number | null
          usuario_id: string
        }
        Update: {
          calorias?: number | null
          carboidratos?: number | null
          categoria_refeicao_id?: string | null
          dados_n8n?: Json | null
          dados_raw_ia?: Json | null
          data_registro?: string | null
          deletado_em?: string | null
          descricao_ia?: string | null
          gorduras?: number | null
          id?: string
          proteinas?: number | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "informacoes_nutricionais_categoria_refeicao_id_fkey"
            columns: ["categoria_refeicao_id"]
            isOneToOne: false
            referencedRelation: "categorias_refeicao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "informacoes_nutricionais_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          detected_emotions: Json | null
          emotion_entry_id: string | null
          id: string
          updated_at: string
          user_id: string
          word_count: number
        }
        Insert: {
          content: string
          created_at?: string
          detected_emotions?: Json | null
          emotion_entry_id?: string | null
          id?: string
          updated_at?: string
          user_id: string
          word_count?: number
        }
        Update: {
          content?: string
          created_at?: string
          detected_emotions?: Json | null
          emotion_entry_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_emotion_entry_id_fkey"
            columns: ["emotion_entry_id"]
            isOneToOne: false
            referencedRelation: "emotion_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_day_completions: {
        Row: {
          challenge_done: boolean | null
          completed_at: string | null
          day_number: number
          id: string
          mood_after: string | null
          mood_before: string | null
          practice_done: boolean | null
          reflection_note: string | null
          teaching_read: boolean | null
          user_journey_id: string
        }
        Insert: {
          challenge_done?: boolean | null
          completed_at?: string | null
          day_number: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          practice_done?: boolean | null
          reflection_note?: string | null
          teaching_read?: boolean | null
          user_journey_id: string
        }
        Update: {
          challenge_done?: boolean | null
          completed_at?: string | null
          day_number?: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          practice_done?: boolean | null
          reflection_note?: string | null
          teaching_read?: boolean | null
          user_journey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_day_completions_user_journey_id_fkey"
            columns: ["user_journey_id"]
            isOneToOne: false
            referencedRelation: "user_journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_days: {
        Row: {
          activity_description: string | null
          activity_type: string | null
          bonus_tip: string | null
          challenge_description: string | null
          challenge_title: string | null
          created_at: string | null
          day_number: number
          id: string
          image_url: string | null
          journey_id: string
          reflection_prompt: string | null
          suggested_breathing_id: string | null
          suggested_meditation_id: string | null
          teaching_author: string | null
          teaching_text: string
          title: string
        }
        Insert: {
          activity_description?: string | null
          activity_type?: string | null
          bonus_tip?: string | null
          challenge_description?: string | null
          challenge_title?: string | null
          created_at?: string | null
          day_number: number
          id?: string
          image_url?: string | null
          journey_id: string
          reflection_prompt?: string | null
          suggested_breathing_id?: string | null
          suggested_meditation_id?: string | null
          teaching_author?: string | null
          teaching_text: string
          title: string
        }
        Update: {
          activity_description?: string | null
          activity_type?: string | null
          bonus_tip?: string | null
          challenge_description?: string | null
          challenge_title?: string | null
          created_at?: string | null
          day_number?: number
          id?: string
          image_url?: string | null
          journey_id?: string
          reflection_prompt?: string | null
          suggested_breathing_id?: string | null
          suggested_meditation_id?: string | null
          teaching_author?: string | null
          teaching_text?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_days_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journey_days_suggested_breathing_id_fkey"
            columns: ["suggested_breathing_id"]
            isOneToOne: false
            referencedRelation: "breathing_techniques"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journey_days_suggested_meditation_id_fkey"
            columns: ["suggested_meditation_id"]
            isOneToOne: false
            referencedRelation: "meditation_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          benefits: Json | null
          category: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string
          difficulty: string | null
          display_order: number | null
          duration_days: number
          explanation: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          subtitle: string | null
          theme_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          benefits?: Json | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description: string
          difficulty?: string | null
          display_order?: number | null
          duration_days?: number
          explanation?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          subtitle?: string | null
          theme_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          benefits?: Json | null
          category?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string
          difficulty?: string | null
          display_order?: number | null
          duration_days?: number
          explanation?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          subtitle?: string | null
          theme_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      meditation_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      meditation_tracks: {
        Row: {
          access_level: string | null
          background_audio_url: string | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          deleted_at: string | null
          description: string | null
          display_order: number | null
          duration_display: string
          duration_ms: number
          explanation: string | null
          has_background_music: boolean | null
          has_narration: boolean | null
          id: string
          is_active: boolean | null
          narration_audio_url: string | null
          short_description: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          background_audio_url?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_display: string
          duration_ms: number
          explanation?: string | null
          has_background_music?: boolean | null
          has_narration?: boolean | null
          id?: string
          is_active?: boolean | null
          narration_audio_url?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          background_audio_url?: string | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_display?: string
          duration_ms?: number
          explanation?: string | null
          has_background_music?: boolean | null
          has_narration?: boolean | null
          id?: string
          is_active?: boolean | null
          narration_audio_url?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meditation_tracks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "meditation_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_progress: {
        Row: {
          completed_at: string | null
          completed_steps: Json | null
          created_at: string | null
          current_step: number | null
          experience_level: string | null
          id: string
          is_completed: boolean | null
          preferred_time: string | null
          selected_goals: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_steps?: Json | null
          created_at?: string | null
          current_step?: number | null
          experience_level?: string | null
          id?: string
          is_completed?: boolean | null
          preferred_time?: string | null
          selected_goals?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_steps?: Json | null
          created_at?: string | null
          current_step?: number | null
          experience_level?: string | null
          id?: string
          is_completed?: boolean | null
          preferred_time?: string | null
          selected_goals?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plan_feature_access: {
        Row: {
          access_level: string | null
          created_at: string | null
          feature_key: string | null
          id: string
          plan_id: string | null
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          created_at?: string | null
          feature_key?: string | null
          id?: string
          plan_id?: string | null
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          created_at?: string | null
          feature_key?: string | null
          id?: string
          plan_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plan_feature_access_feature_key_fkey"
            columns: ["feature_key"]
            isOneToOne: false
            referencedRelation: "feature_access_levels"
            referencedColumns: ["feature_key"]
          },
          {
            foreignKeyName: "plan_feature_access_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      planos: {
        Row: {
          action: string | null
          ativo: boolean | null
          checkout_plano_id: string | null
          checkout_signature_link: string | null
          criado_em: string | null
          deletado_em: string | null
          descricao: string | null
          eh_plano_gestor: boolean | null
          features: string | null
          id: string
          max_dependentes: number | null
          nome_plano: string
          periodo: string | null
          popular: boolean | null
          valor: number
        }
        Insert: {
          action?: string | null
          ativo?: boolean | null
          checkout_plano_id?: string | null
          checkout_signature_link?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          descricao?: string | null
          eh_plano_gestor?: boolean | null
          features?: string | null
          id?: string
          max_dependentes?: number | null
          nome_plano: string
          periodo?: string | null
          popular?: boolean | null
          valor: number
        }
        Update: {
          action?: string | null
          ativo?: boolean | null
          checkout_plano_id?: string | null
          checkout_signature_link?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          descricao?: string | null
          eh_plano_gestor?: boolean | null
          features?: string | null
          id?: string
          max_dependentes?: number | null
          nome_plano?: string
          periodo?: string | null
          popular?: boolean | null
          valor?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          peso_atual_kg: number | null
          plano_id: string | null
          role: string | null
          updated_at: string
          user_id: string
          whatsapp_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          peso_atual_kg?: number | null
          plano_id?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
          whatsapp_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          peso_atual_kg?: number | null
          plano_id?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
          whatsapp_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      registro_hidratacao: {
        Row: {
          created_at: string | null
          horario: string
          id: string
          quantidade_ml: number
          tipo_liquido: Database["public"]["Enums"]["tipo_liquido"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          horario?: string
          id?: string
          quantidade_ml: number
          tipo_liquido?: Database["public"]["Enums"]["tipo_liquido"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          horario?: string
          id?: string
          quantidade_ml?: number
          tipo_liquido?: Database["public"]["Enums"]["tipo_liquido"] | null
          user_id?: string
        }
        Relationships: []
      }
      spiritual_guides: {
        Row: {
          approach: string
          avatar_emoji: string | null
          created_at: string | null
          description: string
          display_order: number | null
          example_messages: Json | null
          id: string
          is_active: boolean | null
          name: string
          personality_traits: Json | null
          suggested_questions: Json | null
          system_prompt: string
          topics: Json | null
          updated_at: string | null
          welcome_message: string | null
        }
        Insert: {
          approach: string
          avatar_emoji?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          example_messages?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          personality_traits?: Json | null
          suggested_questions?: Json | null
          system_prompt: string
          topics?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
        }
        Update: {
          approach?: string
          avatar_emoji?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          example_messages?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          personality_traits?: Json | null
          suggested_questions?: Json | null
          system_prompt?: string
          topics?: Json | null
          updated_at?: string | null
          welcome_message?: string | null
        }
        Relationships: []
      }
      user_accessibility_settings: {
        Row: {
          created_at: string
          font_scale: string
          high_contrast: boolean
          reduce_motion: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          font_scale?: string
          high_contrast?: boolean
          reduce_motion?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          font_scale?: string
          high_contrast?: boolean
          reduce_motion?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_favorite_breathings: {
        Row: {
          breathing_id: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          breathing_id: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          breathing_id?: string
          created_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_breathings_breathing_id_fkey"
            columns: ["breathing_id"]
            isOneToOne: false
            referencedRelation: "breathing_techniques"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorite_journeys: {
        Row: {
          created_at: string | null
          journey_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          journey_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          journey_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_journeys_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorite_meditations: {
        Row: {
          created_at: string | null
          meditation_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          meditation_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          meditation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_meditations_meditation_id_fkey"
            columns: ["meditation_id"]
            isOneToOne: false
            referencedRelation: "meditation_tracks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feature_overrides: {
        Row: {
          access_level: string
          created_at: string | null
          expires_at: string | null
          feature_key: string | null
          granted_by: string | null
          id: string
          reason: string | null
          user_id: string | null
        }
        Insert: {
          access_level: string
          created_at?: string | null
          expires_at?: string | null
          feature_key?: string | null
          granted_by?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Update: {
          access_level?: string
          created_at?: string | null
          expires_at?: string | null
          feature_key?: string | null
          granted_by?: string | null
          id?: string
          reason?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_feature_overrides_feature_key_fkey"
            columns: ["feature_key"]
            isOneToOne: false
            referencedRelation: "feature_access_levels"
            referencedColumns: ["feature_key"]
          },
        ]
      }
      user_guide_preferences: {
        Row: {
          created_at: string | null
          preferred_guide_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          preferred_guide_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          preferred_guide_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_guide_preferences_preferred_guide_id_fkey"
            columns: ["preferred_guide_id"]
            isOneToOne: false
            referencedRelation: "spiritual_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      user_journeys: {
        Row: {
          completed_at: string | null
          current_day: number
          id: string
          is_completed: boolean | null
          journey_id: string
          last_activity_at: string | null
          started_at: string | null
          streak_count: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          current_day?: number
          id?: string
          is_completed?: boolean | null
          journey_id: string
          last_activity_at?: string | null
          started_at?: string | null
          streak_count?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          current_day?: number
          id?: string
          is_completed?: boolean | null
          journey_id?: string
          last_activity_at?: string | null
          started_at?: string | null
          streak_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_journeys_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          atualizado_em: string | null
          celular: string | null
          criado_em: string | null
          deletado_em: string | null
          email: string | null
          gestor_id: string | null
          id: string
          nome_completo: string | null
          peso_atual_kg: number | null
          plano: string | null
          plano_id: string | null
          status: Database["public"]["Enums"]["tipo_status_assinatura"] | null
          tipo_usuario: Database["public"]["Enums"]["tipo_usuario"] | null
        }
        Insert: {
          atualizado_em?: string | null
          celular?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          email?: string | null
          gestor_id?: string | null
          id: string
          nome_completo?: string | null
          peso_atual_kg?: number | null
          plano?: string | null
          plano_id?: string | null
          status?: Database["public"]["Enums"]["tipo_status_assinatura"] | null
          tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"] | null
        }
        Update: {
          atualizado_em?: string | null
          celular?: string | null
          criado_em?: string | null
          deletado_em?: string | null
          email?: string | null
          gestor_id?: string | null
          id?: string
          nome_completo?: string | null
          peso_atual_kg?: number | null
          plano?: string | null
          plano_id?: string | null
          status?: Database["public"]["Enums"]["tipo_status_assinatura"] | null
          tipo_usuario?: Database["public"]["Enums"]["tipo_usuario"] | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos"
            referencedColumns: ["id"]
          },
        ]
      }
      vinculos_usuarios: {
        Row: {
          ativo: boolean | null
          criado_em: string | null
          id: string
          usuario_id: string
          usuario_principal_id: string
        }
        Insert: {
          ativo?: boolean | null
          criado_em?: string | null
          id?: string
          usuario_id: string
          usuario_principal_id: string
        }
        Update: {
          ativo?: boolean | null
          criado_em?: string | null
          id?: string
          usuario_id?: string
          usuario_principal_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vinculos_usuarios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vinculos_usuarios_usuario_principal_id_fkey"
            columns: ["usuario_principal_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_gestor_access_user: {
        Args: { _gestor_id: string; _user_id: string }
        Returns: boolean
      }
      can_manage_dependents: { Args: { _user_id: string }; Returns: boolean }
      check_content_access: {
        Args: {
          p_content_id: string
          p_content_type: string
          p_user_id: string
        }
        Returns: boolean
      }
      check_feature_access:
        | {
            Args: { p_feature_key: string; p_user_id: string }
            Returns: string
          }
        | { Args: { feature_name: string; user_uuid: string }; Returns: string }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["tipo_usuario"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_current_user: { Args: { _user_id: string }; Returns: boolean }
      is_socio: { Args: never; Returns: boolean }
      refresh_user_gamification: {
        Args: { p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      tipo_intensidade_exercicio: "leve" | "moderada" | "intensa"
      tipo_lembrete: "agua" | "refeicao" | "peso" | "exercicio" | "meditacao"
      tipo_liquido: "água" | "suco" | "chá" | "café" | "refrigerante" | "outro"
      tipo_nivel_dificuldade: "facil" | "moderado" | "dificil"
      tipo_objetivo:
        | "perder_peso"
        | "manter_peso"
        | "ganhar_peso"
        | "melhorar_saude"
      tipo_status_assinatura: "ativa" | "cancelada" | "suspensa" | "expirada"
      tipo_status_envio: "pendente" | "enviado" | "erro"
      tipo_status_pagamento: "pendente" | "aprovado" | "recusado" | "estornado"
      tipo_usuario: "cliente" | "socio" | "gestor" | "dependente"
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
      app_role: ["admin", "moderator", "user"],
      tipo_intensidade_exercicio: ["leve", "moderada", "intensa"],
      tipo_lembrete: ["agua", "refeicao", "peso", "exercicio", "meditacao"],
      tipo_liquido: ["água", "suco", "chá", "café", "refrigerante", "outro"],
      tipo_nivel_dificuldade: ["facil", "moderado", "dificil"],
      tipo_objetivo: [
        "perder_peso",
        "manter_peso",
        "ganhar_peso",
        "melhorar_saude",
      ],
      tipo_status_assinatura: ["ativa", "cancelada", "suspensa", "expirada"],
      tipo_status_envio: ["pendente", "enviado", "erro"],
      tipo_status_pagamento: ["pendente", "aprovado", "recusado", "estornado"],
      tipo_usuario: ["cliente", "socio", "gestor", "dependente"],
    },
  },
} as const

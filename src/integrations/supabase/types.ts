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
      agency_client_events: {
        Row: {
          client_id: string
          created_at: string
          event_date_ad: string | null
          event_date_bs: string | null
          event_name: string | null
          id: string
          required_crew: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          event_date_ad?: string | null
          event_date_bs?: string | null
          event_name?: string | null
          id?: string
          required_crew?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          event_date_ad?: string | null
          event_date_bs?: string | null
          event_name?: string | null
          id?: string
          required_crew?: string | null
          user_id?: string
        }
        Relationships: []
      }
      agency_client_payments: {
        Row: {
          amount: number
          bank_id: string | null
          client_id: string
          created_at: string
          id: string
          is_opening_balance: boolean
          note: string | null
          payment_date: string
          payment_date_bs: string | null
          payment_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          bank_id?: string | null
          client_id: string
          created_at?: string
          id?: string
          is_opening_balance?: boolean
          note?: string | null
          payment_date?: string
          payment_date_bs?: string | null
          payment_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          bank_id?: string | null
          client_id?: string
          created_at?: string
          id?: string
          is_opening_balance?: boolean
          note?: string | null
          payment_date?: string
          payment_date_bs?: string | null
          payment_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agency_clients: {
        Row: {
          advance_amount: number
          client_name: string
          contact_number: string | null
          created_at: string
          description: string | null
          email: string | null
          event_area: string | null
          event_city: string | null
          event_date_ad: string | null
          event_date_bs: string | null
          event_from_city: string | null
          event_location_type: string | null
          event_name: string | null
          event_to_city: string | null
          handler: string | null
          id: string
          notes: string | null
          package_amount: number
          source: string | null
          status: string
          updated_at: string
          user_id: string
          whatsapp_number: string | null
        }
        Insert: {
          advance_amount?: number
          client_name: string
          contact_number?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          event_area?: string | null
          event_city?: string | null
          event_date_ad?: string | null
          event_date_bs?: string | null
          event_from_city?: string | null
          event_location_type?: string | null
          event_name?: string | null
          event_to_city?: string | null
          handler?: string | null
          id?: string
          notes?: string | null
          package_amount?: number
          source?: string | null
          status?: string
          updated_at?: string
          user_id: string
          whatsapp_number?: string | null
        }
        Update: {
          advance_amount?: number
          client_name?: string
          contact_number?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          event_area?: string | null
          event_city?: string | null
          event_date_ad?: string | null
          event_date_bs?: string | null
          event_from_city?: string | null
          event_location_type?: string | null
          event_name?: string | null
          event_to_city?: string | null
          handler?: string | null
          id?: string
          notes?: string | null
          package_amount?: number
          source?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      agency_finance_banks: {
        Row: {
          account_holder_name: string
          bank_name: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_holder_name: string
          bank_name: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string
          bank_name?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agency_finance_pins: {
        Row: {
          created_at: string
          failed_attempts: number
          id: string
          locked_until: string | null
          pin_hash: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          failed_attempts?: number
          id?: string
          locked_until?: string | null
          pin_hash: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          failed_attempts?: number
          id?: string
          locked_until?: string | null
          pin_hash?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agency_finance_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token_hash: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token_hash: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token_hash?: string
          user_id?: string
        }
        Relationships: []
      }
      agency_settings: {
        Row: {
          created_at: string
          handlers: string[]
          id: string
          sources: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          handlers?: string[]
          id?: string
          sources?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          handlers?: string[]
          id?: string
          sources?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agency_staff_invitations: {
        Row: {
          agency_user_id: string
          created_at: string
          gadget: string | null
          id: string
          invited_user_id: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          agency_user_id: string
          created_at?: string
          gadget?: string | null
          id?: string
          invited_user_id: string
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          agency_user_id?: string
          created_at?: string
          gadget?: string | null
          id?: string
          invited_user_id?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      booking_details: {
        Row: {
          booking_id: string
          bride_contact: string | null
          bride_full_name: string | null
          bride_home_area: string | null
          bride_home_city: string | null
          bride_instagram: string | null
          bride_whatsapp: string | null
          created_at: string
          event_end_time: string | null
          event_name: string | null
          event_owner_name: string | null
          event_owner_user_id: string | null
          event_owner_whatsapp: string | null
          event_start_time: string | null
          form_token: string | null
          groom_contact: string | null
          groom_full_name: string | null
          groom_home_area: string | null
          groom_home_city: string | null
          groom_instagram: string | null
          groom_whatsapp: string | null
          id: string
          is_own_event: boolean
          role_category: string | null
          sub_role: string | null
          updated_at: string
          user_id: string
          venue_area: string | null
          venue_city: string | null
          venue_map: string | null
          venue_name: string | null
          venue_type: string | null
        }
        Insert: {
          booking_id: string
          bride_contact?: string | null
          bride_full_name?: string | null
          bride_home_area?: string | null
          bride_home_city?: string | null
          bride_instagram?: string | null
          bride_whatsapp?: string | null
          created_at?: string
          event_end_time?: string | null
          event_name?: string | null
          event_owner_name?: string | null
          event_owner_user_id?: string | null
          event_owner_whatsapp?: string | null
          event_start_time?: string | null
          form_token?: string | null
          groom_contact?: string | null
          groom_full_name?: string | null
          groom_home_area?: string | null
          groom_home_city?: string | null
          groom_instagram?: string | null
          groom_whatsapp?: string | null
          id?: string
          is_own_event?: boolean
          role_category?: string | null
          sub_role?: string | null
          updated_at?: string
          user_id: string
          venue_area?: string | null
          venue_city?: string | null
          venue_map?: string | null
          venue_name?: string | null
          venue_type?: string | null
        }
        Update: {
          booking_id?: string
          bride_contact?: string | null
          bride_full_name?: string | null
          bride_home_area?: string | null
          bride_home_city?: string | null
          bride_instagram?: string | null
          bride_whatsapp?: string | null
          created_at?: string
          event_end_time?: string | null
          event_name?: string | null
          event_owner_name?: string | null
          event_owner_user_id?: string | null
          event_owner_whatsapp?: string | null
          event_start_time?: string | null
          form_token?: string | null
          groom_contact?: string | null
          groom_full_name?: string | null
          groom_home_area?: string | null
          groom_home_city?: string | null
          groom_instagram?: string | null
          groom_whatsapp?: string | null
          id?: string
          is_own_event?: boolean
          role_category?: string | null
          sub_role?: string | null
          updated_at?: string
          user_id?: string
          venue_area?: string | null
          venue_city?: string | null
          venue_map?: string | null
          venue_name?: string | null
          venue_type?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          event_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          event_name: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          event_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      broadcast_dismissals: {
        Row: {
          broadcast_id: string
          dismissed_at: string
          id: string
          user_id: string
        }
        Insert: {
          broadcast_id: string
          dismissed_at?: string
          id?: string
          user_id: string
        }
        Update: {
          broadcast_id?: string
          dismissed_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      broadcasts: {
        Row: {
          active: boolean
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          message: string
          title: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          message: string
          title: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          message?: string
          title?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      crew_assignments: {
        Row: {
          assigned_freelancer: string | null
          created_at: string
          event_id: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_freelancer?: string | null
          created_at?: string
          event_id: string
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_freelancer?: string | null
          created_at?: string
          event_id?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      feed_comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      feed_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number
          parent_id: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_id?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number
          parent_id?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      feed_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      feed_notifications: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          post_id: string
          read: boolean
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          post_id: string
          read?: boolean
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          post_id?: string
          read?: boolean
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      feed_posts: {
        Row: {
          comments_count: number
          content: string | null
          created_at: string
          id: string
          image_path: string | null
          image_url: string | null
          likes_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number
          content?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          likes_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number
          content?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          likes_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      files_management: {
        Row: {
          backup_1_device_name: string | null
          backup_1_recorded_at: string | null
          backup_2_device_name: string | null
          backup_2_path: string | null
          backup_2_recorded_at: string | null
          backup_3_device_name: string | null
          backup_3_path: string | null
          backup_3_recorded_at: string | null
          backup_history: string | null
          card_label: string | null
          category: string | null
          client_folder_name: string | null
          client_name: string | null
          confirmed: boolean | null
          created_at: string
          deleted_or_not: boolean | null
          double_backup: boolean | null
          double_backup_path: string | null
          drive_link: string | null
          drive_upload: boolean | null
          drive_upload_path: string | null
          event_date_ad: string | null
          event_day: string | null
          event_folder_name: string | null
          event_month: string | null
          event_name: string | null
          event_year: string | null
          final_generated_path: string | null
          format_type: string | null
          freelancer_name: string | null
          freelancer_type: string | null
          id: string
          notes: string | null
          number_of_items: number | null
          reconfirmation: boolean | null
          registered_date_bs: string | null
          registered_date_time_ad: string
          side: string | null
          size_gb: number | null
          storage_device_id: string | null
          storage_type: string | null
          synced_to_sheet: boolean | null
          triple_backup: boolean | null
          triple_backup_path: string | null
          updated_at: string
          user_id: string
          who_copied: string | null
          year_event_folder: string | null
        }
        Insert: {
          backup_1_device_name?: string | null
          backup_1_recorded_at?: string | null
          backup_2_device_name?: string | null
          backup_2_path?: string | null
          backup_2_recorded_at?: string | null
          backup_3_device_name?: string | null
          backup_3_path?: string | null
          backup_3_recorded_at?: string | null
          backup_history?: string | null
          card_label?: string | null
          category?: string | null
          client_folder_name?: string | null
          client_name?: string | null
          confirmed?: boolean | null
          created_at?: string
          deleted_or_not?: boolean | null
          double_backup?: boolean | null
          double_backup_path?: string | null
          drive_link?: string | null
          drive_upload?: boolean | null
          drive_upload_path?: string | null
          event_date_ad?: string | null
          event_day?: string | null
          event_folder_name?: string | null
          event_month?: string | null
          event_name?: string | null
          event_year?: string | null
          final_generated_path?: string | null
          format_type?: string | null
          freelancer_name?: string | null
          freelancer_type?: string | null
          id?: string
          notes?: string | null
          number_of_items?: number | null
          reconfirmation?: boolean | null
          registered_date_bs?: string | null
          registered_date_time_ad?: string
          side?: string | null
          size_gb?: number | null
          storage_device_id?: string | null
          storage_type?: string | null
          synced_to_sheet?: boolean | null
          triple_backup?: boolean | null
          triple_backup_path?: string | null
          updated_at?: string
          user_id?: string
          who_copied?: string | null
          year_event_folder?: string | null
        }
        Update: {
          backup_1_device_name?: string | null
          backup_1_recorded_at?: string | null
          backup_2_device_name?: string | null
          backup_2_path?: string | null
          backup_2_recorded_at?: string | null
          backup_3_device_name?: string | null
          backup_3_path?: string | null
          backup_3_recorded_at?: string | null
          backup_history?: string | null
          card_label?: string | null
          category?: string | null
          client_folder_name?: string | null
          client_name?: string | null
          confirmed?: boolean | null
          created_at?: string
          deleted_or_not?: boolean | null
          double_backup?: boolean | null
          double_backup_path?: string | null
          drive_link?: string | null
          drive_upload?: boolean | null
          drive_upload_path?: string | null
          event_date_ad?: string | null
          event_day?: string | null
          event_folder_name?: string | null
          event_month?: string | null
          event_name?: string | null
          event_year?: string | null
          final_generated_path?: string | null
          format_type?: string | null
          freelancer_name?: string | null
          freelancer_type?: string | null
          id?: string
          notes?: string | null
          number_of_items?: number | null
          reconfirmation?: boolean | null
          registered_date_bs?: string | null
          registered_date_time_ad?: string
          side?: string | null
          size_gb?: number | null
          storage_device_id?: string | null
          storage_type?: string | null
          synced_to_sheet?: boolean | null
          triple_backup?: boolean | null
          triple_backup_path?: string | null
          updated_at?: string
          user_id?: string
          who_copied?: string | null
          year_event_folder?: string | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
          status: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
          status?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
          status?: string
        }
        Relationships: []
      }
      freelancer_profiles: {
        Row: {
          account_type: string
          area: string | null
          available_for_travel: boolean | null
          bank_account_holder: string | null
          bank_account_number: string | null
          bank_name: string | null
          bio: string | null
          business_name: string | null
          camera_body: string | null
          city: string | null
          contact_number: string
          contact_person_2_name: string | null
          contact_person_2_number: string | null
          contact_person_2_whatsapp: string | null
          contact_person_3_name: string | null
          contact_person_3_number: string | null
          contact_person_3_whatsapp: string | null
          created_at: string | null
          drone_model: string | null
          drone_operator: string | null
          editing_setup: string | null
          email: string | null
          facebook: string | null
          fpv_operator: string | null
          full_name: string
          google_map_link: string | null
          hide_booking_dates: boolean
          hide_email: boolean
          hybrid_editor: string | null
          hybrid_shooter: string | null
          id: string
          instagram: string | null
          iphone_shooter: string | null
          lenses: string | null
          main_job: string | null
          pathao_landmark: string | null
          photo_editor: string | null
          photographer: string | null
          portfolio_links: string[] | null
          preferred_event_types: string | null
          profile_photo_url: string | null
          rate_per_day: string | null
          tiktok: string | null
          updated_at: string | null
          user_id: string
          video_editor: string | null
          videographer: string | null
          whatsapp_number: string
          youtube: string | null
        }
        Insert: {
          account_type?: string
          area?: string | null
          available_for_travel?: boolean | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          bio?: string | null
          business_name?: string | null
          camera_body?: string | null
          city?: string | null
          contact_number?: string
          contact_person_2_name?: string | null
          contact_person_2_number?: string | null
          contact_person_2_whatsapp?: string | null
          contact_person_3_name?: string | null
          contact_person_3_number?: string | null
          contact_person_3_whatsapp?: string | null
          created_at?: string | null
          drone_model?: string | null
          drone_operator?: string | null
          editing_setup?: string | null
          email?: string | null
          facebook?: string | null
          fpv_operator?: string | null
          full_name?: string
          google_map_link?: string | null
          hide_booking_dates?: boolean
          hide_email?: boolean
          hybrid_editor?: string | null
          hybrid_shooter?: string | null
          id?: string
          instagram?: string | null
          iphone_shooter?: string | null
          lenses?: string | null
          main_job?: string | null
          pathao_landmark?: string | null
          photo_editor?: string | null
          photographer?: string | null
          portfolio_links?: string[] | null
          preferred_event_types?: string | null
          profile_photo_url?: string | null
          rate_per_day?: string | null
          tiktok?: string | null
          updated_at?: string | null
          user_id: string
          video_editor?: string | null
          videographer?: string | null
          whatsapp_number?: string
          youtube?: string | null
        }
        Update: {
          account_type?: string
          area?: string | null
          available_for_travel?: boolean | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          bio?: string | null
          business_name?: string | null
          camera_body?: string | null
          city?: string | null
          contact_number?: string
          contact_person_2_name?: string | null
          contact_person_2_number?: string | null
          contact_person_2_whatsapp?: string | null
          contact_person_3_name?: string | null
          contact_person_3_number?: string | null
          contact_person_3_whatsapp?: string | null
          created_at?: string | null
          drone_model?: string | null
          drone_operator?: string | null
          editing_setup?: string | null
          email?: string | null
          facebook?: string | null
          fpv_operator?: string | null
          full_name?: string
          google_map_link?: string | null
          hide_booking_dates?: boolean
          hide_email?: boolean
          hybrid_editor?: string | null
          hybrid_shooter?: string | null
          id?: string
          instagram?: string | null
          iphone_shooter?: string | null
          lenses?: string | null
          main_job?: string | null
          pathao_landmark?: string | null
          photo_editor?: string | null
          photographer?: string | null
          portfolio_links?: string[] | null
          preferred_event_types?: string | null
          profile_photo_url?: string | null
          rate_per_day?: string | null
          tiktok?: string | null
          updated_at?: string | null
          user_id?: string
          video_editor?: string | null
          videographer?: string | null
          whatsapp_number?: string
          youtube?: string | null
        }
        Relationships: []
      }
      global_lagan_dates: {
        Row: {
          bs_day: number
          bs_month: number
          bs_year: number
          created_at: string
          created_by: string | null
          id: string
        }
        Insert: {
          bs_day: number
          bs_month: number
          bs_year: number
          created_at?: string
          created_by?: string | null
          id?: string
        }
        Update: {
          bs_day?: number
          bs_month?: number
          bs_year?: number
          created_at?: string
          created_by?: string | null
          id?: string
        }
        Relationships: []
      }
      group_messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          image_path: string | null
          image_url: string | null
          reply_to_id: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          reply_to_id?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          image_path?: string | null
          image_url?: string | null
          reply_to_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lagan_dates: {
        Row: {
          bs_day: number
          bs_month: number
          bs_year: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          bs_day: number
          bs_month: number
          bs_year: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          bs_day?: number
          bs_month?: number
          bs_year?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      market_applications: {
        Row: {
          created_at: string
          id: string
          message: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      market_assignments: {
        Row: {
          application_id: string
          assigned_by: string
          assigned_user_id: string
          created_at: string
          id: string
          post_id: string
          status: string
        }
        Insert: {
          application_id: string
          assigned_by: string
          assigned_user_id: string
          created_at?: string
          id?: string
          post_id: string
          status?: string
        }
        Update: {
          application_id?: string
          assigned_by?: string
          assigned_user_id?: string
          created_at?: string
          id?: string
          post_id?: string
          status?: string
        }
        Relationships: []
      }
      market_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      market_notifications: {
        Row: {
          created_at: string
          from_user_id: string | null
          id: string
          post_id: string | null
          read: boolean
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          from_user_id?: string | null
          id?: string
          post_id?: string | null
          read?: boolean
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string | null
          id?: string
          post_id?: string | null
          read?: boolean
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      market_post_dates: {
        Row: {
          area: string | null
          city: string | null
          created_at: string
          event_date: string
          freelancer_type: string | null
          id: string
          min_camera: string | null
          post_id: string
          timings: string | null
        }
        Insert: {
          area?: string | null
          city?: string | null
          created_at?: string
          event_date: string
          freelancer_type?: string | null
          id?: string
          min_camera?: string | null
          post_id: string
          timings?: string | null
        }
        Update: {
          area?: string | null
          city?: string | null
          created_at?: string
          event_date?: string
          freelancer_type?: string | null
          id?: string
          min_camera?: string | null
          post_id?: string
          timings?: string | null
        }
        Relationships: []
      }
      market_post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      market_post_views: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      market_posts: {
        Row: {
          created_at: string
          default_area: string | null
          default_city: string | null
          default_min_camera: string | null
          event_name: string
          freelancer_type: string | null
          id: string
          total_price: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_area?: string | null
          default_city?: string | null
          default_min_camera?: string | null
          event_name: string
          freelancer_type?: string | null
          id?: string
          total_price?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_area?: string | null
          default_city?: string | null
          default_min_camera?: string | null
          event_name?: string
          freelancer_type?: string | null
          id?: string
          total_price?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          reporter_id: string
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          reporter_id: string
          status?: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          reporter_id?: string
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: []
      }
      storage_devices: {
        Row: {
          cloud_type: string | null
          created_at: string
          device_name: string
          device_type: string
          expiry_date_ad: string | null
          health_percent: number
          id: string
          pc_drive_letter: string | null
          price_npr: number | null
          purchase_date_ad: string | null
          purchase_date_bs: string | null
          purchased_from: string | null
          remaining_storage_gb: number | null
          safety_status: string
          speed_rating: number
          synced_to_sheet: boolean | null
          total_storage_gb: number
          updated_at: string
          used_storage_gb: number
          user_id: string
        }
        Insert: {
          cloud_type?: string | null
          created_at?: string
          device_name?: string
          device_type?: string
          expiry_date_ad?: string | null
          health_percent?: number
          id?: string
          pc_drive_letter?: string | null
          price_npr?: number | null
          purchase_date_ad?: string | null
          purchase_date_bs?: string | null
          purchased_from?: string | null
          remaining_storage_gb?: number | null
          safety_status?: string
          speed_rating?: number
          synced_to_sheet?: boolean | null
          total_storage_gb?: number
          updated_at?: string
          used_storage_gb?: number
          user_id?: string
        }
        Update: {
          cloud_type?: string | null
          created_at?: string
          device_name?: string
          device_type?: string
          expiry_date_ad?: string | null
          health_percent?: number
          id?: string
          pc_drive_letter?: string | null
          price_npr?: number | null
          purchase_date_ad?: string | null
          purchase_date_bs?: string | null
          purchased_from?: string | null
          remaining_storage_gb?: number | null
          safety_status?: string
          speed_rating?: number
          synced_to_sheet?: boolean | null
          total_storage_gb?: number
          updated_at?: string
          used_storage_gb?: number
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_suspensions: {
        Row: {
          active: boolean
          created_at: string
          id: string
          reason: string | null
          suspended_by: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          id?: string
          reason?: string | null
          suspended_by: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          reason?: string | null
          suspended_by?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_agency_finance_bank: {
        Args: { _account_holder_name: string; _bank_name: string }
        Returns: Json
      }
      admin_link_orphan_to_user: {
        Args: { _target_user: string }
        Returns: Json
      }
      admin_list_users: {
        Args: { _limit?: number; _search?: string }
        Returns: {
          account_type: string
          contact_number: string
          created_at: string
          email: string
          full_name: string
          is_admin: boolean
          is_suspended: boolean
          profile_photo_url: string
          suspension_reason: string
          user_id: string
        }[]
      }
      admin_platform_stats: { Args: never; Returns: Json }
      admin_set_role: {
        Args: { _make_admin: boolean; _target_user: string }
        Returns: undefined
      }
      admin_set_suspension: {
        Args: { _reason?: string; _suspend: boolean; _target_user: string }
        Returns: undefined
      }
      admin_signups_by_day: {
        Args: { _days?: number }
        Returns: {
          day: string
          signups: number
        }[]
      }
      are_mutual_followers: {
        Args: { user1: string; user2: string }
        Returns: boolean
      }
      delete_agency_client_payment: {
        Args: { _payment_id: string; _pin: string }
        Returns: Json
      }
      has_agency_finance_pin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_conversation_member: {
        Args: { _conversation_id: string; _user_id: string }
        Returns: boolean
      }
      is_suspended: { Args: { _user_id: string }; Returns: boolean }
      link_orphan_profile_to_current_user: { Args: never; Returns: Json }
      set_agency_finance_pin: { Args: { _pin: string }; Returns: Json }
      update_agency_client_finance:
        | {
            Args: {
              _client_id: string
              _package_amount: number
              _payment_amount?: number
              _payment_date?: string
              _payment_date_bs?: string
              _payment_note?: string
              _pin: string
            }
            Returns: Json
          }
        | {
            Args: {
              _client_id: string
              _package_amount: number
              _payment_amount?: number
              _payment_date?: string
              _payment_date_bs?: string
              _payment_note?: string
              _payment_type?: string
              _pin: string
            }
            Returns: Json
          }
      update_agency_client_finance_add_payment: {
        Args: {
          _amount: number
          _bank_id?: string
          _client_id: string
          _is_opening_balance?: boolean
          _payment_date?: string
          _payment_date_bs?: string
          _payment_note?: string
          _payment_type?: string
          _session_token: string
        }
        Returns: Json
      }
      update_agency_client_finance_edit_payments: {
        Args: {
          _client_id: string
          _package_amount: number
          _payments?: Json
          _session_token: string
        }
        Returns: Json
      }
      verify_agency_finance_pin: { Args: { _pin: string }; Returns: Json }
      verify_agency_finance_session: {
        Args: { _token: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const

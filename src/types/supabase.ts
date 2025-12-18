export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          role: string;
          default_address_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string | null;
          role?: string;
          default_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          role?: string;
          default_address_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_default_address_fk';
            columns: ['default_address_id'];
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          line1: string;
          line2: string | null;
          city: string;
          region: string;
          postal_code: string;
          country: string;
          within_pilot_zone: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          line1: string;
          line2?: string | null;
          city: string;
          region: string;
          postal_code: string;
          country?: string;
          within_pilot_zone?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          line1?: string;
          line2?: string | null;
          city?: string;
          region?: string;
          postal_code?: string;
          country?: string;
          within_pilot_zone?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      pets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          species: string;
          breed: string | null;
          age_years: number | null;
          weight_kg: number | null;
          size: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          species: string;
          breed?: string | null;
          age_years?: number | null;
          weight_kg?: number | null;
          size?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          species?: string;
          breed?: string | null;
          age_years?: number | null;
          weight_kg?: number | null;
          size?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'pets_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      products: {
        Row: {
          id: string;
          name: string;
          species: string;
          category: string;
          description: string | null;
          price: number;
          currency: string;
          weight_kg: number | null;
          is_essential: boolean;
          is_subscription_eligible: boolean;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          species: string;
          category: string;
          description?: string | null;
          price: number;
          currency?: string;
          weight_kg?: number | null;
          is_essential?: boolean;
          is_subscription_eligible?: boolean;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          species?: string;
          category?: string;
          description?: string | null;
          price?: number;
          currency?: string;
          weight_kg?: number | null;
          is_essential?: boolean;
          is_subscription_eligible?: boolean;
          in_stock?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      carts: {
        Row: {
          id: string;
          user_id: string;
          subtotal: number;
          shipping_cost: number;
          total: number;
          currency: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          currency?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          currency?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'carts_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      cart_items: {
        Row: {
          id: string;
          cart_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          cart_id: string;
          product_id: string;
          quantity?: number;
          unit_price: number;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          cart_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
          line_total?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_items_cart_id_fkey';
            columns: ['cart_id'];
            referencedRelation: 'carts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          delivery_method: string;
          delivery_address_id: string | null;
          subtotal: number;
          shipping_cost: number;
          total: number;
          currency: string;
          estimated_delivery_window: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: string;
          delivery_method?: string;
          delivery_address_id?: string | null;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          currency?: string;
          estimated_delivery_window?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          delivery_method?: string;
          delivery_address_id?: string | null;
          subtotal?: number;
          shipping_cost?: number;
          total?: number;
          currency?: string;
          estimated_delivery_window?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity?: number;
          unit_price: number;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
          line_total?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          pet_id: string | null;
          frequency_weeks: number;
          status: string;
          next_delivery_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          pet_id?: string | null;
          frequency_weeks?: number;
          status?: string;
          next_delivery_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          pet_id?: string | null;
          frequency_weeks?: number;
          status?: string;
          next_delivery_date?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_pet_id_fkey';
            columns: ['pet_id'];
            referencedRelation: 'pets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      favorite_products: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'favorite_products_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'favorite_products_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      support_tickets: {
        Row: {
          id: string;
          user_id: string;
          order_id: string | null;
          category: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_id?: string | null;
          category: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_id?: string | null;
          category?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'support_tickets_order_id_fkey';
            columns: ['order_id'];
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'support_tickets_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface Item {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string | null;
  status: "lost" | "found";
  location: string;
  item_date: string;
  image_url: string | null;
  contact_email: string;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateItemInput {
  title: string;
  category: string;
  description?: string;
  status: "lost" | "found";
  location: string;
  item_date: string;
  image_url?: string;
  contact_email: string;
}

export function useItems(filters?: { status?: string; category?: string; search?: string }) {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: async () => {
      let query = supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "All") {
        query = query.eq("status", filters.status.toLowerCase());
      }

      if (filters?.category && filters.category !== "All") {
        query = query.eq("category", filters.category);
      }

      if (filters?.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Item[];
    },
  });
}

export function useUserItems() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-items", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Item[];
    },
    enabled: !!user,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateItemInput) => {
      if (!user) throw new Error("Must be logged in to create an item");

      const { data, error } = await supabase
        .from("items")
        .insert({
          ...input,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["user-items"] });
      toast.success("Item reported successfully!");
    },
    onError: (error) => {
      toast.error("Failed to report item", {
        description: error.message,
      });
    },
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("item-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("item-images").getPublicUrl(filePath);

      return data.publicUrl;
    },
    onError: (error) => {
      toast.error("Failed to upload image", {
        description: error.message,
      });
    },
  });
}

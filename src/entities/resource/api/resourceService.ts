import { supabase } from "@/shared/api/supabase";
import { Resource } from "@/entities/resource/model/types";

export const resourceService = {
    async getResources(): Promise<Resource[]> {
        const { data, error } = await supabase
            .from('resources')
            .select('*')
            .eq('status', 'Approved');

        if (error) {
            console.error('Error fetching resources:', error);
            throw error;
        }

        return data || [];
    }
};

import { supabase } from "@/shared/api/supabase";
import { apiClient } from "@/shared/api/client";
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
    },
    async getResourceById(id: string): Promise<Resource> {
        const response = await apiClient.get(`/resources/${id}`);
        return response.data;
    },
    async updateResource(id: string, data: Partial<Resource>): Promise<Resource> {
        const response = await apiClient.patch(`/resources/${id}`, data);
        return response.data;
    },
    async updateResourceStatus(id: string, status: string): Promise<Resource> {
        const response = await apiClient.patch(`/resources/${id}`, { status });
        return response.data;
    },
    async deleteResource(id: string): Promise<void> {
        await apiClient.delete(`/resources/${id}`);
    },
};

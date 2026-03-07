import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resourceService } from '@/entities/resource/api/resourceService';
import { Resource } from '@/entities/resource/model/types';

export const useUpdateResourceStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => resourceService.updateResourceStatus(id, status),

    onSuccess: (_, { id }) => {
      // removes the deleted item from cached list instantly
      queryClient.setQueryData<Resource[]>(['resources'], (prev) =>
        prev?.filter((r) => r.id !== id) ?? []
      )
    },

    onError: (error) => {
      console.error('Failed to update resource', error)
    },
  })
}
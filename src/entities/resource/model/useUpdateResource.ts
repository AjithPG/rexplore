import { useMutation } from '@tanstack/react-query';
import { resourceService } from '@/entities/resource/api/resourceService';
import { Resource } from '@/entities/resource/model/types';

export const useUpdateResource = () => {

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resource> }) => resourceService.updateResource(id, data),

    onSuccess: () => {
      console.log('Resource updated successfully')
    },

    onError: (error) => {
      console.error('Failed to update resource', error)
    },
  })
}
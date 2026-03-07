import { useMutation } from '@tanstack/react-query';
import { resourceService } from '@/entities/resource/api/resourceService';
import { Resource } from '@/entities/resource/model/types';

export const useAddResource = () => {

  return useMutation({
    mutationFn: (resource: Partial<Resource>) => resourceService.addResource(resource),

    onSuccess: () => {
      console.log('Resource added successfully')
    },

    onError: (error) => {
      console.error('Failed to add resource', error)
    },
  })
}
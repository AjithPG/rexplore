import { useQuery } from "@tanstack/react-query";
import { resourceService } from "@/entities/resource/api/resourceService";

export function useResources() {
    return useQuery({
        queryKey: ["resources"],
        queryFn: () => resourceService.getResources(),
    });
}
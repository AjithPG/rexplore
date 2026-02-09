import { useQuery } from "@tanstack/react-query";
import { resourceService } from "@/services/resourceService";

export function useResources() {
    return useQuery({
        queryKey: ["resources"],
        queryFn: () => resourceService.getResources(),
    });
}
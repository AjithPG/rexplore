export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
    type: string;
    tags: string[];
    image_url?: string;
    status?: string;
    submitted_by?: string;
}

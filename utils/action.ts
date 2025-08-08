import db from '@/utils/db';

export const fetchResources = async()=>{
    const resources = await db.product.findMany();
    return resources;
}
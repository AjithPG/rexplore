import db from '@/utils/db';
import { redirect } from 'next/navigation';

export const fetchResources = async()=>{
    const resources = await db.product.findMany();
    return resources;
}

export const fetchSingleResource = async(resourceId:string)=>{
    const resource = await db.product.findUnique({
        where:{
            id:resourceId
        }
    })
    return resource;

    // if(!resource) redirect("/resources"){
    //     return resource;
    // }
}
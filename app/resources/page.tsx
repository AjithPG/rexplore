import { ResourcesContainer } from "@/components/resources/ResourcesContainer";


const ResourcesPage = async({searchParams}:{searchParams:Promise<{layout?:string,search?:string}>}) => {
  const layout = (await searchParams).layout || 'grid';
  const search = (await searchParams).search || '';
  console.log(searchParams)
  return (
    <>
     <ResourcesContainer layout={layout} search={search}/>
    </>
   
  )
}

export default ResourcesPage
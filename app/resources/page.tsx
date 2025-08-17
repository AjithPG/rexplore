import { ResourcesContainer } from "@/components/resources/ResourcesContainer";


const ResourcesPage = ({searchParams}:{searchParams:{layout?:string,search?:string}}) => {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';
  console.log(searchParams)
  return (
    <>
     <ResourcesContainer layout={layout} search={search}/>
    </>
   
  )
}

export default ResourcesPage
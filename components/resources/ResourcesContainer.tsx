import Link from "next/link"
import { Button } from "../ui/button"
import { RiLayoutGridLine, RiListView } from "@remixicon/react"
import { fetchResources } from "@/utils/action"
import { Separator } from "../ui/separator"
import ResourcesGrid from "./ResourcesGrid"
import ResourcesList from "./ResourcesList"


export const ResourcesContainer = async({layout,search}:{layout:string,search:string}) => {
  const resources = await fetchResources();
  const totalResources = resources.length;
  const searchTerm = search?`&search=${search}`:'';
  return (
    <>
    <section>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-lg">
           {totalResources} Product{totalResources > 1 ? 's':''}
        </h4>
        <div className="flex gap-4">
          <Button variant={layout==='grid'? 'default' : 'ghost'} size="icon" asChild>
            <Link href={`/resources?layout=grid${searchTerm}`}>
              <RiLayoutGridLine />
            </Link>
          </Button>
             <Button variant={layout==='list'? 'default' : 'ghost'} size="icon" asChild>
            <Link href={`/resources?layout=list${searchTerm}`}>
            <RiListView/>
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="mt-4"/>
    </section>
    <section>
      {
        totalResources === 0 ? (
          <h5>Sorry No resources available</h5>
        ): layout === 'grid' ? (
          <ResourcesGrid resources={resources}/>
        ):(
          <ResourcesList resources={resources}/>
        )
      }
    </section>
    </>
    
  )
}

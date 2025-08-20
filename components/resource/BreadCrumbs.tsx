import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadCrumbs = ({name}:{name:string}) => {
  return (
    <Breadcrumb>
    <BreadcrumbList>
     <BreadcrumbItem>
      <BreadcrumbLink href='/' className='capitalize text-lg'>
       home
      </BreadcrumbLink>
     </BreadcrumbItem>
       <BreadcrumbSeparator />
       <BreadcrumbItem>
      <BreadcrumbLink href='/resources' className='capitalize text-lg'>
        resources
      </BreadcrumbLink>
     </BreadcrumbItem>
     <BreadcrumbSeparator />
       <BreadcrumbItem>
      <BreadcrumbLink  className='capitalize text-lg'>
        {name}
      </BreadcrumbLink>
     </BreadcrumbItem>
    </BreadcrumbList>
    </Breadcrumb>
    
  )
}

export default BreadCrumbs
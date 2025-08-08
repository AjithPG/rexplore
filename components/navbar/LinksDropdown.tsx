import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiMenuLine } from '@remixicon/react';
import { Links } from '@/utils/links';
import Link from 'next/link';

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <RiMenuLine className='w-6 h-6'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='center' sideOffset={5}>
        {Links.map((link)=>{
          return(
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className='capitalize w-full'>{link.label}</Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown
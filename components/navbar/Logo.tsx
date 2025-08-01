import Link from "next/link"
import { Button } from "../ui/button"
import {RiCompass3Line} from "@remixicon/react"


const Logo = () => {
  return (
    <Button asChild>
       <Link href={"/"}>
       <RiCompass3Line/>
         Rexplore
       </Link>
    </Button>
  )
}

export default Logo
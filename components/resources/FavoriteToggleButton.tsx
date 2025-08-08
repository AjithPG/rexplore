import { RiHeartLine } from "@remixicon/react"
import { Button } from "../ui/button"


const FavoriteToggleButton = () => {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <RiHeartLine/>
    </Button>
  )
}

export default FavoriteToggleButton
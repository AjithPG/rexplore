import { auth, currentUser } from "@clerk/nextjs/server"
import { RiUserLine } from "@remixicon/react";

const UserIcon = async() => {
  //const {userID} = auth();
  const user = await currentUser();
  const profileImg = user?.imageUrl;
  if(profileImg){
    return (
      <img src={profileImg} alt="user" className="w-6 h-6 rounded-full object-cover"/>
    )
  }
  return <RiUserLine className="w-6 h-6 rounded-full bg-primary text-white"/>
}

export default UserIcon
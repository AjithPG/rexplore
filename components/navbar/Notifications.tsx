import { RiNotificationLine } from "@remixicon/react";
import { Button } from "../ui/button";
import Link from "next/link";

const Notifications = () => {
  const notificationCount = 1;
  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/notifications">
        <RiNotificationLine className="w-6 h-6" />
        <span className="absolute -top-3 -right-3 bg-primary text-white h-6 w-6 rounded-full flex justify-center items-center">
          {notificationCount}
        </span>
      </Link>
    </Button>
  );
};

export default Notifications;

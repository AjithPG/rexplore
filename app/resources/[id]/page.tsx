import BreadCrumbs from "@/components/resource/BreadCrumbs";
import FavoriteToggleButton from "@/components/resources/FavoriteToggleButton";
import { Button } from "@/components/ui/button";
import { fetchSingleResource } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

const SingleResourcePage = async ({ params }: { params: { id: string } }) => {
  const paramsID = await params;
  const resource = (await fetchSingleResource(paramsID.id)) as Product;
  const { id, name, description, image, url } = resource;
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-96 md:h-[400px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center justify-between">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton resourceId={id} />
          </div>
          <p className="text-md mt-6 mb-6 leading-8 text-muted-foreground">
            {description}
          </p>
          <Button asChild>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              View
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SingleResourcePage;

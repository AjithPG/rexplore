import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import FavoriteToggleButton from "./FavoriteToggleButton";

const ResourcesList = ({ resources }: { resources: Product[] }) => {
  return (
    <div className="mt-12 grid  gap-y-4 gap-x-4">
      {resources.map((resource) => {
        const { name, image } = resource;
        const resourceId = resource.id;
        return (
          <article key={resourceId} className="group relative">
            <Link href={`/resources/${resourceId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500 py-0">
                <CardContent className="p-4 grid  md:grid-cols-[192px_1fr] gap-y-8 gap-x-8">
                  <div className="relative h-64 md:h-48 md:w-48 w-full rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      priority
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-left">
                    <h2 className="text-lg capitalize">{name}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7 z-5">
              <FavoriteToggleButton resourceId={resourceId} />
            </div>
          </article>
        );
      })}
    </div>
  )
}

export default ResourcesList
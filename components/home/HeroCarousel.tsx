import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import hero1 from "@/public/images/image-1.jpg";
import hero2 from "@/public/images/image-2.jpg";
import hero3 from "@/public/images/image-3.jpg";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const carouselImages = [hero1, hero2, hero3];

const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent>
                  <Image
                    src={image}
                    alt="hero"
                    className="w-full h-[24rem] rounded-md object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;

'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

type PropertyImagesProps = {
  images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProps) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            // @ts-expect-error - type definition error
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images[0]}
                  alt=""
                  width={1800}
                  height={400}
                  priority={true}
                  className="mx-auto h-[400px] cursor-pointer rounded-xl object-cover"
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}`}
                >
                  {/* @ts-expect-error - type definition error */}
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt=""
                        width={1800}
                        height={400}
                        priority={true}
                        className="h-[400px] w-full cursor-pointer rounded-xl object-cover"
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;

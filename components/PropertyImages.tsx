'use client';

import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

type PropertyImagesProps = {
  images: string[];
};

function PsItem({ src, className }: { src: string; className: string }) {
  const node = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - react-photoswipe-gallery Item typing not aligned with React 19
    <Item original={src} thumbnail={src} width={1000} height={600}>
      {({ ref, open }) => (
        <Image
          ref={ref}
          onClick={open}
          src={src}
          alt=""
          width={1800}
          height={400}
          priority
          className={className}
        />
      )}
    </Item>
  );
  return node;
}

const PropertyImages = ({ images }: PropertyImagesProps) => {
  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <PsItem
              src={images[0]}
              className="mx-auto h-[400px] cursor-pointer rounded-xl object-cover"
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  }
                >
                  <PsItem
                    src={image}
                    className="h-[400px] w-full cursor-pointer rounded-xl object-cover"
                  />
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

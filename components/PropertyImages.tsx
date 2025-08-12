import Image from 'next/image';

type PropertyImagesProps = {
  images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProps) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            priority={true}
            className="mx-auto h-[400px] rounded-xl object-cover"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className={`${images.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}`}>
                <Image
                  src={image}
                  alt=""
                  width={1800}
                  height={400}
                  priority={true}
                  className="h-[400px] w-full rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;

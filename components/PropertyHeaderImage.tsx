import Image from 'next/image';

type PropertyHeaderImageType = {
  image: string;
};

const PropertyHeaderImage = ({ image }: PropertyHeaderImageType) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="h-[400px] w-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;

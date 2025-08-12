import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import type { Property as PropertyType } from '@/types';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import { serializeProperty } from '@/utils/serializeData';

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
  await connectDB();
  const { id } = await params;

  const dbproperty = (await Property.findById(
    id,
  ).lean()) as unknown as PropertyType;
  const property = serializeProperty(dbproperty);

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );
  }
  
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto px-6 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto px-6 py-10">
          <div className="md:grid-cols-70/30 grid w-full grid-cols-1 gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;

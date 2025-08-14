import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToSerializeableObject';

type PropertyEditPageProps = {
  params: Promise<{ id: string }>;
};

const PropertyEditPage = async ({ params }: PropertyEditPageProps) => {
  const { id } = await params;

  await connectDB();
  const dbProperty = await Property.findById(id).lean();
  const property = convertToSerializeableObject(dbProperty);

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;

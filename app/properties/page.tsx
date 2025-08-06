import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import type { Property as PropertyType } from '@/types';

const PropertiesPage = async () => {
  await connectDB();
  const properties = (await Property.find(
    {},
  ).lean()) as unknown as PropertyType[];

  return (
    <>
      <section className="px-4 py-6">
        <div className="m-auto px-4 py-6 lg:container">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;

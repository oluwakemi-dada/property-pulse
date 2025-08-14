import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import type { Property as PropertyType } from '@/types';

type PropertiesPageProps = {
  searchParams: Promise<{ page: number; pageSize: number }>;
};

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  await connectDB();
  const { page = 1, pageSize = 9 } = await searchParams;

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const properties = (await Property.find({})
    .skip(skip)
    .limit(pageSize)) as unknown as PropertyType[];

  const showPagination = total > pageSize;

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
          {showPagination && (
            <Pagination
              page={Number(page)}
              pageSize={Number(pageSize)}
              totalItems={total}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;

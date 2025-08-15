import connectDB from '@/config/database';
import Property from '@/models/Property';
import FeaturedPropertyCard from './FeaturedPropertyCard';
import { convertToSerializeableObject } from '@/utils/convertToSerializeableObject';

const FeaturedProperties = async () => {
  await connectDB();

  const dbProperties = await Property.find({
    is_featured: true,
  }).lean();

  const properties = dbProperties.map(convertToSerializeableObject);

  if (properties.length === 0) return null;

  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl m-auto lg:container">
        <h2 className="mb-6 text-center text-3xl font-bold text-blue-500">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

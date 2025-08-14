import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { serializeProperties } from '@/utils/serializeData';
import { FilterQuery } from 'mongoose';
import type { Property as PropertyType } from '@/types';

type SearchResultsPageProps = {
  searchParams: Promise<{
    location: string;
    propertyType: string;
  }>;
};

const SearchResultsPage = async ({ searchParams }: SearchResultsPageProps) => {
  await connectDB();

  const { location, propertyType } = await searchParams;

  const locationPattern = new RegExp(location, 'i');

  const query: FilterQuery<PropertyType> = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');

    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = serializeProperties(propertiesQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="item-start mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <Link
            href="/properties"
            className="mb-3 flex items-center text-blue-500 hover:underline"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" />
            Back To Properties
          </Link>
          <h1 className="mb-4 text-2xl">Search Results</h1>
          {properties.length === 0 && <p>No search results</p>}
          {properties.length > 0 && (
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

export default SearchResultsPage;

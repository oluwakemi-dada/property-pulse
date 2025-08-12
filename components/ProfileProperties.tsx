'use client';

import { useState } from 'react';
import { Property } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

type ProfilePropertiesProps = {
  properties: Property[];
};

const ProfileProperties = ({
  properties: initialProperties,
}: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState(initialProperties);

  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1000}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href="/properties/add"
          className="mr-2 rounded-md bg-blue-500 px-3 py-3 text-white hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;

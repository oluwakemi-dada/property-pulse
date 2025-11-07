import { redirect } from "next/navigation";
import PropertyCard from '@/components/PropertyCard';
import User from '@/models/User';
import { Property } from '@/types';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    redirect("/signin")
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId).populate('bookmarks');

  if (!user) {
    throw new Error('User not found');
  }

  const { bookmarks } = user;

  return (
    <section className="px-4 py-6">
      <div className="container m-auto px-4 py-6 lg:container">
        <h1 className="mb-4 text-2xl">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bookmarks.map((property: Property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

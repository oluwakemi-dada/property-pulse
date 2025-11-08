import PropertyAddForm from '@/components/PropertyAddForm';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from "next/navigation";

const PropertyAddPage = async () => {
  const sessionUser = await getSessionUser();
  const currentPath = '/properties/add'; 
  
  if (!sessionUser){
    redirect(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`)
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md bg-white px-6 py-8 shadow-md md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;

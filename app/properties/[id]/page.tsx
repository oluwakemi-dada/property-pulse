type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;
  return (
    <div>
      <h1>Property Page {id}</h1>
    </div>
  );
};

export default PropertyPage;

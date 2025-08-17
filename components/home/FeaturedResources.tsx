import { fetchResources } from "@/utils/action";
import SectionTitle from "../global/SectionTitle";
import EmptyList from "../global/EmptyList";
import ResourcesGrid from "../resources/ResourcesGrid";

const FeaturedResources = async () => {
  const resources = await fetchResources();

  if (resources.length === 0) return <EmptyList />;

  return (
    <>
      <section className="pt-24">
        <SectionTitle text="Featured Resources" />
        <ResourcesGrid resources={resources} />
      </section>
    </>
  );
};

export default FeaturedResources;

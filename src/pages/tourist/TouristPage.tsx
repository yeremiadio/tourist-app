import Layout from "../../components/Layouts/Layout";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import classNames from "../../utils/tailwindClassNames";

function TouristPage() {
  const skeletonNum = 2;
  return (
    <Layout>
      <section className="p-4 h-screen">
        <div className="container mx-auto">
          <div className={classNames("flex gap-4 flex-col md:flex-row")}>
            {Array.from(new Array(skeletonNum)).map((item) => (
              <CardSkeleton key={item} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TouristPage;

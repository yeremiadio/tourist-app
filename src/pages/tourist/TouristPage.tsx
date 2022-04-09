import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TouristCard from "../../components/Cards/TouristCard";
import Layout from "../../components/Layouts/Layout";
import PaginationButton from "../../components/Paginations/PaginationButton";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTourists } from "../../redux/tourist/touristSlice";
import classNames from "../../utils/tailwindClassNames";

function TouristPage() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<SetStateAction<number | any>>(1);
  const [isLoading, setIsLoading] = useState<SetStateAction<any>>(false);

  const { touristList } = useAppSelector((state) => state.tourist);
  useEffect(() => {
    const ac = new AbortController();
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch(getTourists({ pageNum: page, setIsLoading }));
    return () => {
      ac.abort();
    };
  }, [dispatch, page]);

  return (
    <Layout>
      <section className="p-4 h-screen w-full">
        <div className="container mx-auto">
          <div
            className={classNames(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            )}
          >
            {isLoading && touristList ? (
              <CardSkeleton />
            ) : (
              touristList.data?.map((item: any, index: number) => (
                <Link key={item.id} to={item.id}>
                  <TouristCard {...item} />
                </Link>
              ))
            )}
          </div>
          {touristList && (
            <PaginationButton
              siblingCount={1}
              itemsPerPage={touristList.per_page}
              setPage={setPage}
              totalRecord={touristList.totalrecord}
              totalPage={touristList.total_pages}
              currentPage={page}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}

export default TouristPage;

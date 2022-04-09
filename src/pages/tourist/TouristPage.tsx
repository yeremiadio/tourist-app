import { SetStateAction, useEffect, useMemo, useState } from "react";
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

  const { touristList } = useAppSelector((state) => state.tourist);
  useEffect(() => {
    const ac = new AbortController();
    dispatch(getTourists({ pageNum: page }));
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
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            )}
          >
            {touristList ? (
              touristList.data?.map((item: any, index: number) => (
                <TouristCard key={item.id} {...item} />
              ))
            ) : (
              <CardSkeleton />
            )}
          </div>
          {touristList && (
            <PaginationButton
              siblingCount={2}
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

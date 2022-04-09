import { PlusIcon } from "@heroicons/react/solid";
import { SetStateAction, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import TouristCard from "../../components/Cards/TouristCard";
import Layout from "../../components/Layouts/Layout";
import PaginationButton from "../../components/Paginations/PaginationButton";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTourists } from "../../redux/tourist/touristSlice";
import classNames from "../../utils/tailwindClassNames";

function TouristPage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchparams] = useSearchParams() as any;
  let pageParams = searchParams.get("page") || "";
  const [page, setPage] = useState<SetStateAction<number | any>>(
    +pageParams || 1
  );
  const [isLoading, setIsLoading] = useState<SetStateAction<any>>(false);

  const { touristList } = useAppSelector((state) => state.tourist);

  // useEffect(() => {
  //   const ac = new AbortController();
  //   setPage(pageParams);

  //   return () => {
  //     ac.abort();
  //   };
  // }, []);

  useEffect(() => {
    const ac = new AbortController();
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch(getTourists({ pageNum: page, setIsLoading }));
    setSearchparams({ page });
    return () => {
      ac.abort();
    };
  }, [dispatch, page, pageParams]);

  return (
    <Layout>
      <section className="p-4 md:px-12 h-screen w-full">
        <div className="container mx-auto">
          <div className="mb-4 flex justify-end min-w-max">
            <Button bgColor="blue-primary" className="gap-2">
              <PlusIcon className="w-4 h-4" />
              Create
            </Button>
          </div>
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
              pageParams={pageParams}
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

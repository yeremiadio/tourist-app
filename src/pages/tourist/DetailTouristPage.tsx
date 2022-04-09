import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTouristById } from "../../redux/tourist/touristSlice";

const DetailTouristPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { id: touristId } = useAppSelector(
    (state) => state.tourist.detailTourist
  );
  useEffect(() => {
    const ac = new AbortController();
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch(getTouristById({ id }));
    return () => {
      ac.abort();
    };
  }, [dispatch, id]);

  return (
    <Layout>
      <div>
        <p>{touristId}</p>
      </div>
    </Layout>
  );
};

export default DetailTouristPage;

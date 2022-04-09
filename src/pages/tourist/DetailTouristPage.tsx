import { LocationMarkerIcon, PencilIcon } from "@heroicons/react/solid";
import { Form, Formik, FormikValues } from "formik";
import { ChangeEvent, Fragment, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Layout from "../../components/Layouts/Layout";
import TextField from "../../components/TextFields/TextField";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTouristById } from "../../redux/tourist/touristSlice";
import { TouristFormValues } from "../../model/Tourist";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const DetailTouristPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    tourist_profilepicture: touristProfilePicture,
    tourist_email: touristEmail,
    tourist_location: touristLocation,
    tourist_name: touristName,
  } = useAppSelector((state) => state.tourist.detailTourist);

  useEffect(() => {
    const ac = new AbortController();
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch(getTouristById({ id }))
      .then(unwrapResult)
      .catch((err) => {
        toast.error(err.message, { position: "bottom-center", duration: 3000 });
        navigate("/tourist");
      });

    return () => {
      ac.abort();
    };
  }, [dispatch, id]);

  const initialValues: TouristFormValues = {
    tourist_profilepicture: touristProfilePicture || "",
    tourist_email: touristEmail || "",
    tourist_location: touristLocation || "",
    tourist_name: touristName || "",
  };
  const formikRef = useRef<FormikValues>() as any;
  const uploadProfilePicture = useRef<HTMLInputElement | null>(null);
  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded =
      (event?.target.files && event?.target?.files[0]) ?? touristProfilePicture;
    formikRef.current.setFieldValue("tourist_profilepicture", fileUploaded);
  };

  const onSubmit = async (values: any) => {
    console.log(values);
    // signinUser({ ...values });
    // if (errors) {
    //   await sleep(3000);
    //   setErrors([]);
    // }
  };

  return (
    <Layout>
      <section className="p-4 h-screen w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formikRef}
        >
          {({ values }) => (
            <Fragment>
              <Form>
                <div className="container mx-auto space-y-4 md:space-y-0  max-w-4xl grid md:grid-cols-2 place-items-center">
                  <div className="grid grid-cols-1 place-items-center overflow-hidden">
                    <div className="flex flex-1 items-center gap-2">
                      <div className="relative">
                        {typeof values.tourist_profilepicture === "string" ? (
                          <img
                            src={touristProfilePicture}
                            alt={touristName}
                            className="rounded-full w-36 h-36 object-cover border border-gray-200"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(
                              values.tourist_profilepicture
                            )}
                            alt={touristName}
                            className="rounded-full w-36 h-36 object-cover border border-gray-200"
                          />
                        )}

                        <button
                          onClick={() => uploadProfilePicture.current?.click()}
                          className="absolute bottom-1 right-2 rounded-full p-3 bg-blue-primary transition-all delay-75 hover:bg-blue-900 cursor-pointer"
                        >
                          <PencilIcon className="w-5 h-5 text-white" />
                          <input
                            type="file"
                            className="hidden"
                            name="tourist_profilepicture"
                            ref={uploadProfilePicture}
                            onChange={handleChangeFile}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="text-center space-y-1 mt-4">
                      <h3 className="text-black-secondary font-bold text-3xl">
                        {values.tourist_name}
                      </h3>
                      <p className="text-base break-all break-words text-black-secondary text-opacity-60">
                        {values.tourist_email}
                      </p>
                      <div className="flex justify-center items-center gap-1 text-black-secondary text-opacity-80">
                        <LocationMarkerIcon className="w-5 h-5" />
                        <p className="text-base mt-[2px]">
                          {values.tourist_location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 w-full md:px-12">
                    <div className="bg-white p-4 rounded-md shadow-md">
                      <TextField name="tourist_name" type="text" label="Name" />
                      <TextField
                        name="tourist_email"
                        type="email"
                        label="Email"
                      />
                      <TextField
                        name="tourist_location"
                        type="text"
                        label="Location"
                      />
                      <Button
                        type="submit"
                        bgColor="blue-primary"
                        className="mt-4"
                        variants="solid"
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </Fragment>
          )}
        </Formik>
      </section>
    </Layout>
  );
};

export default DetailTouristPage;

import {
  ArrowLeftIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { Form, Formik, FormikValues } from "formik";
import {
  ChangeEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import Layout from "../../components/Layouts/Layout";
import TextField from "../../components/TextFields/TextField";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getTouristById } from "../../redux/tourist/touristSlice";
import { TouristFormValues } from "../../model/Tourist";
import { unwrapResult } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  useDeleteTouristMutation,
  useUpdateTouristMutation,
} from "../../redux/api/touristApi";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import DeleteModal from "../../components/Modals/DeleteModal";

const DetailTouristPage = () => {
  const [isOpenModalUpdate, setModalUpdate] =
    useState<SetStateAction<boolean | any>>(false);
  const [isOpenModalDelete, setModalDelete] =
    useState<SetStateAction<boolean | any>>(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    id: touristId,
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
  }, [dispatch, id, navigate]);

  const initialValues: TouristFormValues = {
    id: touristId || "",
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

  const [
    updateTourist,
    { error: errorUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateTouristMutation();

  const [
    deleteTourist,
    { error: errorDelete, isError: isErrorDelete, isSuccess: isSuccessDelete },
  ] = useDeleteTouristMutation();

  const onSubmit = async (values: any) => {
    updateTourist({ ...values });
  };

  const handleDeleteTourist = () => {
    deleteTourist({ id: touristId });
  };

  useEffect(() => {
    const ac = new AbortController();
    if (isErrorUpdate || isErrorDelete) {
      //Formik Actions
      formikRef.current.setSubmitting(false);
      formikRef.current.resetForm();

      //Get Error object
      const errorObj = Object.assign(errorUpdate || (errorDelete as any));

      //Switch case with error status
      switch (errorObj.status) {
        case 400:
          toast.error(`Bad Request [${errorObj.status}]`, {
            duration: 3000,
            position: "bottom-center",
          });
          break;
        case 500:
          toast.error(`${errorObj.data.message}`, {
            duration: 3000,
            position: "bottom-center",
          });
          break;
        default:
          toast.error(`Unexpected Error`, {
            duration: 3000,
            position: "bottom-center",
          });
          break;
      }
    }
    if (isSuccessUpdate || isSuccessDelete) {
      toast.success(
        `Tourist ${
          isSuccessUpdate ? "updated" : isSuccessDelete ? "deleted" : ""
        } successfully`,
        {
          duration: 3000,
          position: "bottom-center",
        }
      );
      formikRef.current.setSubmitting(false);
      navigate("/tourist");
    }

    return () => {
      ac.abort();
    };
  }, [
    isErrorUpdate,
    isSuccessUpdate,
    dispatch,
    isErrorDelete,
    isSuccessDelete,
    errorUpdate,
    errorDelete,
    navigate,
  ]);

  return (
    <Layout>
      <section className="p-4 md:px-12 min-h-screen w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={formikRef}
        >
          {({ values }) => (
            <Fragment>
              <Form>
                <ConfirmationModal
                  isFormSubmit
                  isOpen={isOpenModalUpdate}
                  setOpen={setModalUpdate}
                  message={`update this tourist ${touristName}`}
                />
                <DeleteModal
                  isOpen={isOpenModalDelete}
                  setOpen={setModalDelete}
                  handleClick={handleDeleteTourist}
                />

                <div className="container mx-auto max-w-4xl">
                  <div className="pb-6">
                    <Button
                      bgColor="gray-800"
                      variants="ghost"
                      className="gap-3"
                      type="button"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeftIcon className="w-4 h-4" />
                      Back
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 place-items-center space-y-4 md:space-y-0">
                    <div className="grid grid-cols-1 place-items-center overflow-hidden">
                      <div className="flex flex-1 items-center gap-2">
                        <div className="relative">
                          {typeof values.tourist_profilepicture !== "object" ? (
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
                            type="button"
                            onClick={() =>
                              uploadProfilePicture.current?.click()
                            }
                            className="absolute bottom-1 right-2 rounded-full p-3 bg-blue-500 transition-all delay-75 hover:bg-blue-900 cursor-pointer"
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
                        <h3 className="text-gray-800 font-extrabold text-3xl mb-1">
                          Update Tourist
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Please input all the fields
                        </p>
                        <TextField
                          name="tourist_name"
                          type="text"
                          label="Name"
                        />
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
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => setModalUpdate(true)}
                            bgColor="blue-500"
                            className="mt-4"
                            variants="solid"
                          >
                            Update
                          </Button>
                          <Button
                            type="button"
                            bgColor="red-500"
                            onClick={() => setModalDelete(true)}
                            className="mt-4"
                            variants="outlined"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
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

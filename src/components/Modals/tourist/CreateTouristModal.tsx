import { Form, Formik } from "formik";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { ModalProps } from "../../../model/components/Modal";
import { TouristFormValues } from "../../../model/Tourist";
import { useCreateTouristMutation } from "../../../redux/api/touristApi";
import { useAppDispatch } from "../../../redux/hooks";
import { getTourists } from "../../../redux/tourist/touristSlice";
import Button from "../../Buttons/Button";
import TextField from "../../TextFields/TextField";
import RootModal from "../RootModal";

type Props = {
  pageNumber: number | any;
};

const CreateTouristModal = (props: ModalProps & Props) => {
  const dispatch = useAppDispatch();
  const { isOpen, setOpen } = props;
  const initialValues: Partial<TouristFormValues> = {
    tourist_email: "",
    tourist_location: "",
    tourist_name: "",
  };

  const [createTourist, { isLoading, error, isError, isSuccess }] =
    useCreateTouristMutation();
  useEffect(() => {
    const ac = new AbortController();
    if (isError) {
      //Get Error object
      const errorObj = Object.assign(isError as any);

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
    if (isSuccess) {
      toast.success(`Tourist created successfully`, {
        duration: 3000,
        position: "bottom-center",
      });
      setOpen(false);
      dispatch(getTourists({ pageNum: props.pageNumber }));
    }

    return () => {
      ac.abort();
    };
  }, [isError, isSuccess, dispatch, props.pageNumber, error]);
  const onSubmit = async (values: any) => {
    createTourist({ ...values });
  };
  return (
    <RootModal isOpen={isOpen} setOpen={onSubmit}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Fragment>
            <Form>
              <div className="p-4 w-full grid grid-cols-1 place-content-center">
                <h3 className="text-gray-800 font-extrabold text-3xl mb-1">
                  Create Tourist
                </h3>
                <p className="text-gray-400 text-sm">
                  Please input all the fields
                </p>
                <TextField name="tourist_name" type="text" label="Name" />
                <TextField name="tourist_email" type="email" label="Email" />
                <TextField
                  name="tourist_location"
                  type="text"
                  label="Location"
                />
              </div>
              <div className="p-4 bg-gray-100 flex justify-end gap-2">
                <Button
                  type="submit"
                  bgColor="blue-500"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Submit
                </Button>
                <Button
                  bgColor="blue-500"
                  variants="ghost"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Fragment>
        )}
      </Formik>
    </RootModal>
  );
};

export default CreateTouristModal;

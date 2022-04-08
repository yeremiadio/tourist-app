import { Formik, Form, FormikValues } from "formik";
import TextField from "../components/TextFields/TextField";
import Button from "../components/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { setUser } from "../redux/auth/authSlice";
import { UserLoginFormValues } from "../model/User";
import { useSigninUserMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { sleep } from "../utils/sleep";

function LoginPage() {
  const initialValues: UserLoginFormValues = {
    email: "",
    password: "",
  };
  const formikRef = useRef<FormikValues>() as any;
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Array<string>>([]);
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] =
    useSigninUserMutation();

  const login = async (values: any) => {
    signinUser({ ...values });
    if (errors) {
      await sleep(3000);
      setErrors([]);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    if (isError) {
      //Formik Actions
      formikRef.current.setSubmitting(false);
      formikRef.current.resetForm();

      //Get Error object
      const errorObj = Object.assign(error as any);

      //Switch case with error status
      switch (errorObj.status) {
        case 400:
          setErrors(errorObj.data.message);
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
      //Define user
      const user = data.data;
      //Set user
      dispatch(setUser(user));
      toast.success("Successfully logged in", {
        duration: 3000,
        position: "bottom-center",
      });
      formikRef.current.setSubmitting(false);
      navigate("/");
      localStorage.setItem("token", user.Token);
    }

    return () => {
      ac.abort();
    };
  }, [isError, isSuccess]);

  return (
    <div className="min-h-screen grid grid-cols-1 border border-red-500">
      <div className="grid grid-cols-1 place-content-center">
        <div className="p-4 md:p-8 lg:mx-[30vw]">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={login}
          >
            {() => (
              <Form>
                <div className="mb-6">
                  <h3 className="text-3xl font-extrabold text-black-secondary mb-1">
                    Welcome Back!
                  </h3>
                  <p className="text-black-secondary text-opacity-50 text-sm">
                    Please login with your valid credentials.
                  </p>
                </div>
                {errors.length > 0 && (
                  <div className="bg-red-500 bg-opacity-5 transition-all delay-75 border-2 border-red-500 rounded-lg w-full py-2 px-6">
                    {errors.map((item) => (
                      <ul key={item} className="text-red-500 list-disc text-sm">
                        <li>{item}</li>
                      </ul>
                    ))}
                  </div>
                )}
                <div>
                  <TextField
                    label="Email address"
                    type="email"
                    name="email"
                    isError={errors.length > 0 && true}
                    placeholder="johndoe@example.com"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    isError={errors.length > 0 && true}
                    type="password"
                    placeholder="insert your password..."
                  />
                  <div className="my-3 float-right">
                    <Link to={"/forgot"}>
                      <span className="text-blue-primary font-semibold transition-all delay-75 hover:text-opacity-90 text-sm">
                        Forgot Password?
                      </span>
                    </Link>
                  </div>
                  <Button
                    bgColor="blue-primary"
                    className="text-white w-full mt-2"
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {isLoading ? "Checking..." : "Login"}
                  </Button>
                  <div className="mt-6 text-center">
                    <span className="text-black-secondary text-opacity-50 text-sm">
                      Don't have an account?
                      <Link to={"/register"}>
                        <span className="text-blue-primary font-semibold transition-all delay-75 hover:text-opacity-90 text-sm">
                          {" "}
                          Register
                        </span>
                      </Link>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* <div className="hidden border border-blue-500 md:block"></div> */}
    </div>
  );
}

export default LoginPage;

import apiClient from "../utils/apiClient";
import { Formik, Form } from "formik";
import TextField from "../components/TextFields/TextField";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { sleep } from "../utils/sleep";

interface LoginFormValues {
  email: string;
  password: string;
}
function LoginPage() {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const [errors, setErrors] = useState<Array<string>>([]);
  const handleSubmit = async (values: any, actions: any) => {
    await apiClient()
      .post("api/authaccount/login", values)
      .then((res) => {
        toast.success("You are successfully logged in", {
          duration: 3000,
          position: "bottom-center",
        });
        actions.setSubmitting(false);
        console.log(JSON.stringify(res.data.data));
      })
      .catch((err) => {
        const errorsObj = err.response.data;
        setErrors(errorsObj.message);
        actions.setSubmitting(false);
        toast.error(`${errorsObj.error} [${errorsObj.statusCode}]`, {
          duration: 3000,
          position: "bottom-center",
        });
      });

    if (errors) {
      await sleep(3000);
      setErrors([]);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 border border-red-500">
      <div className="grid grid-cols-1 place-content-center">
        <div className="p-4 md:p-8 lg:mx-[30vw]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <>
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
                <Form>
                  <TextField
                    label="Email address"
                    type="email"
                    isError={errors.length > 0 && true}
                    name="email"
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
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Checking..." : "Login"}
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
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
      {/* <div className="hidden border border-blue-500 md:block"></div> */}
    </div>
  );
}

export default LoginPage;

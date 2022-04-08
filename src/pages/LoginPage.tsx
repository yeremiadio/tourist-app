import apiClient from "../utils/apiClient";
import { Formik, Form } from "formik";
import TextField from "../components/TextFields/TextField";
import Button from "../components/Buttons/Button";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}
function LoginPage() {
  const initialValues: LoginFormValues = {
    email: "badu@gmail.com",
    password: "hahahihi",
  };
  const handleSubmit = async (values: any, actions: any) => {
    await apiClient()
      .post("api/authaccount/login", values)
      .then((res) => {
        console.log(JSON.stringify(res.data.data));
      });
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
                <Form>
                  <TextField
                    label="Email address"
                    type="email"
                    name="email"
                    placeholder="johndoe@example.com"
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="password..."
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

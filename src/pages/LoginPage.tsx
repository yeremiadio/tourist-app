import apiClient from "../utils/apiClient";
import { Formik, Form } from "formik";
import TextField from "../components/TextFields/TextField";
// import SubmitButton from "../components/Buttons/SubmitButton";
import Button from "../components/Buttons/Button";
import Layout from "../components/Layouts/Layout";

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
        // actions.setSubmitting(false);
      });
  };
  return (
    <Layout>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 border border-red-500">
        <div className="grid grid-cols-1 place-content-center">
          <div className="bg-white border border-gray-200 p-4 md:mx-24">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <TextField
                    label="Email"
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
                  <Button
                    bgColor="blue-primary"
                    className="text-white"
                    type="submit"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="hidden border border-blue-500 md:block"></div>
      </div>
    </Layout>
  );
}

export default LoginPage;

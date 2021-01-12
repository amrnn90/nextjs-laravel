import { AppForm, Fieldset } from "../components/AppForm";
import Layout from "../components/Layout";
import * as Yup from "yup";
import useUser from "../hooks/useUser";
import WithGuest from "../components/WithGuest";

export default function Login() {
  const { logIn } = useUser();
  const onSubmit = (data, { setStatus }) => {
    setStatus(null)

    return logIn(data.email, data.password).catch((error) => {
      if (error.response?.data) {
        return setStatus(error.response.data);
      }
      throw error;
    });
  };
  return (
    <WithGuest>
      <Layout>
        <div>
          <a href="http://localhost:8000/auth/google/redirect">Login With Google</a>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {({ isSubmitting, status }) => (
              <>
                <Fieldset name="email" label="Email" />
                <Fieldset name="password" type="password" label="Password" />

                {status?.errors &&
                  Object.values(status.errors).flatMap((error) => (
                    <p key={error}>{error}</p>
                  ))}

                <button type="submit" disabled={isSubmitting}>
                  Login
                </button>
              </>
            )}
          </AppForm>
        </div>
      </Layout>
    </WithGuest>
  );
}

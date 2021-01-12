import * as Yup from "yup";
import { AppForm, Fieldset } from "../components/AppForm";
import Layout from "../components/Layout";
import WithGuest from "../components/WithGuest";
import useUser from "../hooks/useUser";

export default function Register() {
  const { register } = useUser();
  const onSubmit = (values, { setStatus }) => {
    setStatus(null)
    return register(values).catch((error) => {
      if (error.response?.data) {
        return setStatus(error.response.data);
      }
      throw error;
    });
  };
  return (
    <WithGuest>
      <Layout>
        <AppForm
          initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required(),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required(),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <>
              <Fieldset name="name" label="Name" />
              <Fieldset name="email" label="Email" />
              <Fieldset name="password" label="Password" type="password" />
              <Fieldset
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
              />

              {status?.errors &&
                Object.values(status.errors).flatMap((error) => (
                  <p key={error}>{error}</p>
                ))}

              <button type="submit" disabled={isSubmitting}>Create Account</button>
            </>
          )}
        </AppForm>
      </Layout>
    </WithGuest>
  );
}

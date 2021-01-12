import { Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { AppForm, Fieldset } from "../components/AppForm";
import Layout from "../components/Layout";
import WithGuest from "../components/WithGuest";
import useUser from "../hooks/useUser";

export default function Register() {
  const router = useRouter();
  const { resetPassword } = useUser();
  const onSubmit = (values, { setStatus }) => {
    setStatus(null);
    return resetPassword(values)
      .then(() => {
        setStatus({ submitted: true });
      })
      .catch((error) => {
        if (error.response?.data) {
          return setStatus(error.response.data);
        }
        throw error;
      });
  };
  const { email, token } = router.query;

  return (
    <WithGuest>
      <Layout>
        {email && token && (
          <AppForm
            initialValues={{
              email,
              token,
              password: "",
              password_confirmation: "",
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().min(8).required(),
              password_confirmation: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required(),
            })}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, status }) =>
              !status?.submitted ? (
                <>
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

                  <button type="submit" disabled={isSubmitting}>
                    Reset Password
                  </button>
                </>
              ) : (
                <div>
                  Your password was successfully reset, please 
                  <Link href="/login">
                    <a>{' '}login{' '}</a>
                  </Link> 
                  now.
                </div>
              )
            }
          </AppForm>
        )}
      </Layout>
    </WithGuest>
  );
}

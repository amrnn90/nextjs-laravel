import { AppForm, Fieldset } from "../components/AppForm";
import Layout from "../components/Layout";
import * as Yup from "yup";
import useUser from "../hooks/useUser";
import WithGuest from "../components/WithGuest";

export default function ForgotPassword() {
  const { forgotPassword } = useUser();
  const onSubmit = (data, { setStatus }) => {
    setStatus(null);

    return forgotPassword(data.email)
      .then(() => setStatus({ submitted: true }))
      .catch((error) => {
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
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
              email: Yup.string().email().required(),
            })}
          >
            {({ isSubmitting, status }) =>
              !status?.submitted ? (
                <>
                  <Fieldset name="email" label="Email" />

                  {status?.errors &&
                    Object.values(status.errors).flatMap((error) => (
                      <p key={error}>{error}</p>
                    ))}

                  <button type="submit" disabled={isSubmitting}>
                    Send password reset link to email
                  </button>
                </>
              ) : (
                <div>A link was sent to your email to reset your password.</div>
              )
            }
          </AppForm>
        </div>
      </Layout>
    </WithGuest>
  );
}

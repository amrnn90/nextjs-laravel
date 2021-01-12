import { useState } from "react";
import useUser from "../hooks/useUser";
import WithAuth from "./WithAuth";

export default function WithVerify({ children }) {
  const [verificationSent, setVerificationSent] = useState(false);
  const { user, verificationNotification } = useUser();
  const sendVerificationNotification = () => {
    verificationNotification().then(() => {
      setVerificationSent(true);
    });
  };

  return (
    <WithAuth>
      {!!user?.email_verified_at ? (
        children
      ) : !verificationSent ? (
        <div>
          You need to verify your account before you continue. If you'd like us
          to resend a verification email, please{" "}
          <button onClick={() => sendVerificationNotification()}>
            click here
          </button>
        </div>
      ) : (
        <div>A new verification link was sent to your email.</div>
      )}
    </WithAuth>
  );
}

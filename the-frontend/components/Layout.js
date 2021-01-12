import Link from "next/link";
import useUser from "../hooks/useUser";
import VerifySuccessMessage from "./VerifySuccessMessage";
import WithAuth from "./WithAuth";
import WithGuest from "./WithGuest";

export default function Layout({ children }) {
  const { logOut } = useUser();
  return (
    <div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>

        <WithAuth redirect={false}>
          <Link href="/secrets">
            <a>Secrets</a>
          </Link>
          <a href="#" onClick={() => logOut()}>
            Logout
          </a>
        </WithAuth>

        <WithGuest redirect={false}>
          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </WithGuest>
      </div>

      <div>
        <VerifySuccessMessage />
        {children}
      </div>
    </div>
  );
}

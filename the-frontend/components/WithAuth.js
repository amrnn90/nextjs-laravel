import useUser from "../hooks/useUser";
import { useRouter } from "next/router";

export default function WithAuth({
  children,
  redirect = true,
  Fallback = null,
}) {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  if (isLoggedIn === null) return null;
  if (!isLoggedIn) {
    if (Fallback) {
      return <Fallback />;
    } else if (redirect) {
      router.push(`/login?redirect=${router.asPath}`);
      return null;
    } else {
      return null;
    }
  }
  return children;
}

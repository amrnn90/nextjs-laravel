import { useRouter } from "next/router"

export default function VerifySuccessMessage() {
  const router = useRouter();

  if (router.query.verified === '1') {
    return <p>Your account has been verified 👌</p>
  }
  return null
}
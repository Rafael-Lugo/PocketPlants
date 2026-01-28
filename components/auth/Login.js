import { useSession, signIn, signOut } from "next-auth/react";
import LoginForm from "./LoginForm";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email || session.user?.name}
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>

      <button type="button" onClick={() => signIn("github")}>
        Sign in with GitHub
      </button>

      <button onClick={() => router.push("/register")}>Create account</button>
    </div>
  );
}

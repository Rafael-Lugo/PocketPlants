import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function AuthBar() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        right: 8,
        zIndex: 9999,
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: 10,
        borderRadius: 10,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
      }}
    >
      {session ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14 }}>
            Signed in as {session.user?.email || session.user?.name}
          </span>

          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button type="button" onClick={() => signIn("github")}>
            Sign in with GitHub
          </button>

          <div style={{ width: 1, height: 28, background: "rgba(0,0,0,0.12)" }} />

          <div style={{ display: "grid", gap: 6 }}>
            <LoginForm />
            <Link href="/register" style={{ fontSize: 12 }}>
              Create account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

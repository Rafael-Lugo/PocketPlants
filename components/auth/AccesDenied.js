import { signIn } from "next-auth/react";

export default function AccessDenied({
  title = "Access denied",
  message = "Please sign in to continue.",
}) {
  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>{title}</h1>
      <p style={{ marginBottom: 12 }}>{message}</p>

      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}

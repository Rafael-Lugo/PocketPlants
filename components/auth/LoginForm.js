import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm({ onSuccess }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: email.toLowerCase().trim(),
      password,
      callbackUrl: "/",
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrorMessage("Login failed. Check email and password.");
      return;
    }

    setEmail("");
    setPassword("");

    router.replace(result.url || "/");
    
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
      <label style={{ display: "grid", gap: 4 }}>
        Email
        <input
          type="email"
          value={email}
          onChange={(changeEvent) => setEmail(changeEvent.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label style={{ display: "grid", gap: 4 }}>
        Password
        <input
          type="password"
          value={password}
          onChange={(changeEvent) => setPassword(changeEvent.target.value)}
          autoComplete="current-password"
          required
          minLength={8}
        />
      </label>

      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

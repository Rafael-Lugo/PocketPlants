import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(submitEvent) {
    submitEvent.preventDefault();
    setErrorMessage("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      setErrorMessage(errorData.message || "Registration failed");
      return;
    }

    const loginResult = await signIn("credentials", {
      redirect: false,
      email: formState.email,
      password: formState.password,
    });

    if (loginResult?.error) {
      setErrorMessage("Account created, but login failed. Please sign in.");
      return;
    }

    router.push("/");
  }

  function handleNameChange(changeEvent) {
    const newNameValue = changeEvent.target.value;

    setFormState(function updateFormState(previousFormState) {
      return {
        ...previousFormState,
        name: newNameValue,
      };
    });
  }

  function handleEmailChange(changeEvent) {
    const newEmailValue = changeEvent.target.value;

    setFormState(function updateFormState(previousFormState) {
      return {
        ...previousFormState,
        email: newEmailValue,
      };
    });
  }

  function handlePasswordChange(changeEvent) {
    const newPasswordValue = changeEvent.target.value;

    setFormState(function updateFormState(previousFormState) {
      return {
        ...previousFormState,
        password: newPasswordValue,
      };
    });
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Register</h1>

      <form onSubmit={onSubmit}>
        <label>
          Name
          <input value={formState.name} onChange={handleNameChange} />
        </label>

        <br />

        <label>
          Email
          <input
            type="email"
            value={formState.email}
            onChange={handleEmailChange}
          />
        </label>

        <br />

        <label>
          Password (min 8)
          <input
            type="password"
            value={formState.password}
            onChange={handlePasswordChange}
          />
        </label>

        <br />

        {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

        <button type="submit">Create account</button>
      </form>
    </main>
  );
}

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ButtonRow,
  ErrorText,
  Form,
  FormGroup,
  PageTitle,
  PageWrapper,
  SubmitButton,
} from "@/components/Styled/RegisterStyle";

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
      email: formState.email.toLowerCase().trim(),
      password: formState.password,
      callbackUrl: "/",
    });

    if (!loginResult ||loginResult?.error) {
      setErrorMessage("Account created, but login failed. Please sign in.");
      return;
    }

    router.replace(loginResult.url || "/");
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
    <PageWrapper>
      <PageTitle>Register</PageTitle>

      <Form onSubmit={onSubmit}>
        <FormGroup>
          Name
          <input value={formState.name} onChange={handleNameChange} />
        </FormGroup>

        <FormGroup>
          Email
          <input
            type="email"
            value={formState.email}
            onChange={handleEmailChange}
          />
        </FormGroup>

        <FormGroup>
          Password (min 8)
          <input
            type="password"
            value={formState.password}
            onChange={handlePasswordChange}
          />
        </FormGroup>

        {errorMessage ? (
          <ErrorText style={{ color: "red" }}>{errorMessage}</ErrorText>
        ) : null}

        <ButtonRow>
          <SubmitButton type="submit">Create account</SubmitButton>
        </ButtonRow>
      </Form>
    </PageWrapper>
  );
}

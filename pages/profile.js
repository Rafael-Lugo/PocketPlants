import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";
import { Titel, Subtitle } from "@/styles";
import {
  ProfileCard,
  ProfileRow,
  ProfileLabel,
  ProfileValue,
  ProfileForm,
  ProfileInput,
  ProfileActions,
  PrimaryButton,
  DangerButton,
  SecondaryButton,
  ErrorText,
  SuccessText,
} from "@/components/Styled/ProfileStyled";


export default function ProfilePage() {
  const { data: session, status } = useSession();

  const { data, error, isLoading, mutate } = useSWR(
    status === "authenticated" ? "/api/users/me" : null
  );

  async function handleUpdateProfile(submitEvent) {
    submitEvent.preventDefault();

    const form = submitEvent.currentTarget;
    const name = form.name.value;
    const email = form.email?.value;

    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      form.dataset.error = errorData.message || "Update failed";
      form.dataset.success = "";
      return;
    }

    form.dataset.error = "";
    form.dataset.success = "Profile updated";
    await mutate();
  }

  async function handleChangePassword(submitEvent) {
    submitEvent.preventDefault();

    const form = submitEvent.currentTarget;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;

    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      form.dataset.error = errorData.message || "Password change failed";
      form.dataset.success = "";
      return;
    }

    form.reset();
    form.dataset.error = "";
    form.dataset.success = "Password updated";
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Do you really want to delete your account? This will also remove your plants."
    );
    if (!confirmed) return;

    const response = await fetch("/api/users/me", { method: "DELETE" });
    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    await signOut({ callbackUrl: "/" });
  }

  if (status === "loading") {
    return (
      <>
        <Titel>Profile</Titel>
        <Subtitle>Checking session…</Subtitle>
      </>
    );
  }

  if (status === "unauthenticated") {
    return (
      <>
        <Titel>Profile</Titel>
        <Subtitle>Access denied</Subtitle>
        <p>You need to sign in to view your profile.</p>
        <PrimaryButton type="button" onClick={() => signIn()}>
          Sign in
        </PrimaryButton>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Titel>Profile</Titel>
        <Subtitle>Loading…</Subtitle>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Titel>Profile</Titel>
        <Subtitle>Could not load profile</Subtitle>
      </>
    );
  }

  const isGithub = data.provider === "github";
  const isCredentials = data.provider === "credentials";

  return (
    <>
      <Titel>Profile</Titel>

      <ProfileCard>
        <ProfileRow>
          <ProfileLabel>Name</ProfileLabel>
          <ProfileValue>{data.name || "—"}</ProfileValue>
        </ProfileRow>

        <ProfileRow>
          <ProfileLabel>Email</ProfileLabel>
          <ProfileValue>{data.email}</ProfileValue>
        </ProfileRow>

        <ProfileRow>
          <ProfileLabel>Provider</ProfileLabel>
          <ProfileValue>{data.provider}</ProfileValue>
        </ProfileRow>

        <ProfileActions>
          <SecondaryButton type="button" onClick={() => signOut()}>
            Logout
          </SecondaryButton>
        </ProfileActions>
      </ProfileCard>

      <ProfileCard>
        <Subtitle>Edit profile</Subtitle>

        <ProfileForm onSubmit={handleUpdateProfile}>
          <ProfileLabel htmlFor="name">Name</ProfileLabel>
          <ProfileInput id="name" name="name" defaultValue={data.name || ""} />

          <ProfileLabel htmlFor="email">Email</ProfileLabel>
          <ProfileInput
            id="email"
            name="email"
            defaultValue={data.email}
            disabled={isGithub}
          />

          {isGithub ? (
            <p>GitHub users cannot change email here.</p>
          ) : null}

          <ProfileActions>
            <PrimaryButton type="submit">Save</PrimaryButton>
          </ProfileActions>

          <ErrorText>{/* wird per dataset gesetzt (optional) */}</ErrorText>
          <SuccessText></SuccessText>
        </ProfileForm>
      </ProfileCard>

      <ProfileCard>
        <Subtitle>Change password</Subtitle>

        {isCredentials ? (
          <ProfileForm onSubmit={handleChangePassword}>
            <ProfileLabel htmlFor="currentPassword">Current password</ProfileLabel>
            <ProfileInput
              id="currentPassword"
              name="currentPassword"
              type="password"
            />

            <ProfileLabel htmlFor="newPassword">New password (min 8)</ProfileLabel>
            <ProfileInput id="newPassword" name="newPassword" type="password" />

            <ProfileActions>
              <PrimaryButton type="submit">Update password</PrimaryButton>
            </ProfileActions>
          </ProfileForm>
        ) : (
          <p>Password changes are only available for Email/Password accounts.</p>
        )}
      </ProfileCard>

      <ProfileCard>
        <Subtitle>Danger zone</Subtitle>
        <DangerButton type="button" onClick={handleDeleteAccount}>
          Delete account
        </DangerButton>
      </ProfileCard>
    </>
  );
}

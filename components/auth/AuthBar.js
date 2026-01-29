import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoginForm from "./LoginForm";

import {
  AuthBarOuter,
  AuthBarPanel,
  AuthBarHeader,
  AuthBarToggle,
  AvatarCircle,
  AuthBarName,
  AuthBarClose,
  AuthBarBody,
  SignedRow,
  Divider,
  AuthLink,
  GhostButton,
} from "./AuthBarStyled";

export default function AuthBar({ onHeightChange }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    function updateHeight() {
      const height = wrapperRef.current.getBoundingClientRect().height;
      if (typeof onHeightChange === "function") onHeightChange(height);
    }

    updateHeight();

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver.disconnect();
  }, [isOpen, session, status, onHeightChange]);

  if (status === "loading") return null;

  const displayName = session?.user?.email || session?.user?.name || "Sign in";

  return (
    <AuthBarOuter ref={wrapperRef}>
      <AuthBarPanel $isOpen={isOpen}>
        <AuthBarHeader>
          <AuthBarToggle
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Toggle auth panel"
          >
            <AvatarCircle aria-hidden="true">
              {session ? "👤" : "👥"}
            </AvatarCircle>

            {isOpen ? <AuthBarName>{displayName}</AuthBarName> : null}
          </AuthBarToggle>

          {isOpen ? (
            <AuthBarClose type="button" onClick={() => setIsOpen(false)}>
              Close
            </AuthBarClose>
          ) : null}
        </AuthBarHeader>

        {isOpen ? (
          <AuthBarBody>
            {session ? (
              <>
                <SignedRow>
                  <span>Signed in as {displayName}</span>

                  <GhostButton type="button" onClick={() => signOut()}>
                    Sign out
                  </GhostButton>
                </SignedRow>

                <Divider />

                <AuthLink href="/profile" onClick={() => setIsOpen(false)}>
                  Open profile
                </AuthLink>
              </>
            ) : (
              <>
                <GhostButton type="button" onClick={() => signIn("github")}>
                  Sign in with GitHub
                </GhostButton>

                <Divider />

                <LoginForm />

                <AuthLink href="/register" onClick={() => setIsOpen(false)}>
                  Create account
                </AuthLink>
              </>
            )}
          </AuthBarBody>
        ) : null}
      </AuthBarPanel>
    </AuthBarOuter>
  );
}

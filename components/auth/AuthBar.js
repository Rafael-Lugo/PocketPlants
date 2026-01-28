import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function AuthBar({ onHeightChange }) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const element = wrapperRef.current;

    function updateHeight() {
      const height = element.getBoundingClientRect().height;
      onHeightChange(height);
    }

    updateHeight();

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [isOpen, session, status, onHeightChange]);

  if (status === "loading") return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        display: "flex",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
      <div
        style={{
          width: isOpen ? "min(520px, 96vw)" : "auto",
          borderRadius: 16,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: "10px 12px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: "rgba(0,0,0,0.06)",
              }}
            >
              {session ? "👤" : "🔒"}
            </span>

            {isOpen ? (
              <span>
                {session
                  ? session.user?.email || session.user?.name
                  : "Sign in"}
              </span>
            ) : null}
          </button>

          {isOpen ? (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                border: "none",
                background: "rgba(0,0,0,0.06)",
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          ) : null}
        </div>

        {isOpen ? (
          <div style={{ padding: 12, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
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
              <div style={{ display: "grid", gap: 10 }}>
                <button type="button" onClick={() => signIn("github")}>
                  Sign in with GitHub
                </button>

                <div style={{ height: 1, background: "rgba(0,0,0,0.08)" }} />

                <LoginForm />

                <Link href="/register" style={{ fontSize: 13 }}>
                  Create account
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

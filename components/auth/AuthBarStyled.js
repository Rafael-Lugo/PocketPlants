import styled from "styled-components";
import Link from "next/link";

export const AuthBarOuter = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export const AuthBarPanel = styled.div`
  width: ${(props) => (props.$isOpen ? "min(520px, 96vw)" : "auto")};
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

export const AuthBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
`;

export const AuthBarToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
`;

export const AvatarCircle = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.06);
`;

export const AuthBarName = styled.span`
  font-size: 14px;
`;

export const AuthBarClose = styled.button`
  border: none;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 6px 10px;
  cursor: pointer;
`;

export const AuthBarBody = styled.div`
  padding: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 10px;
`;

export const SignedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
`;

export const GhostButton = styled.button`
  border: none;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  width: 100%;
`;

export const AuthLink = styled(Link)`
  font-size: 13px;
  text-decoration: underline;
  width: fit-content;
`;

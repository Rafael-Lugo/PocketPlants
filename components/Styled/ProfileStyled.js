import styled from "styled-components";

export const ProfileCard = styled.section`
  margin: 16px 0;
  padding: 16px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

export const ProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
`;

export const ProfileLabel = styled.label`
  font-weight: 600;
`;

export const ProfileValue = styled.div`
  opacity: 0.9;
`;

export const ProfileForm = styled.form`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

export const ProfileInput = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.18);
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
`;

export const DangerButton = styled.button`
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  margin: 0;
`;

export const SuccessText = styled.p`
  margin: 0;
`;

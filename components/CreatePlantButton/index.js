import { ButtonLink, ButtonWrapper, IconImage } from "../Navigation/StyledNavigation";

import Create from "public/assets/icons/create.svg";

export default function CreatePlantPage() {
  return (
    <ButtonWrapper>
      <ButtonLink href="/create-plant">
        <Create width={52} height={52} alt="Create Plant" />
      </ButtonLink>
    </ButtonWrapper>
  );
}

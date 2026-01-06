import { ButtonLink, ButtonWrapper } from "../Navigation/StyledNavigation";
import CreatePlant from "public/assets/icons/create.svg";

export default function CreatePlantPage() {
  return (
    <ButtonWrapper>
      <ButtonLink href="/create-plant">
        <CreatePlant width={52} height={52} />
      </ButtonLink>
    </ButtonWrapper>
  );
}

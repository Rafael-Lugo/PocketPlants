import Link from "next/link";
import { useRouter } from "next/router";
import {
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationWrapper,
} from "./StyledNavigation";


import Home from "public/assets/icons/home.svg";
import MyPlants from "public/assets/icons/myplant.svg";
import CreatePlant from "public/assets/icons/create.svg";

export default function Navigation() {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink href="/create-plant" $highlighted={router.pathname === "/create-plant"}>
          <CreatePlant width={52} height={52} alt="Create Plant" />
          </NavigationLink>
          
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/" $highlighted={router.pathname === "/"}>
          <Home width={52} height={52} alt="Home" />
          
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/my-plants" $highlighted={router.pathname === "/my-plants"}>
          <MyPlants width={52} height={52} alt="My Plants" />
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
}

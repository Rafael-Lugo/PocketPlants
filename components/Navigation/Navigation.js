import Link from "next/link";
import { useRouter } from "next/router";
import {
  Leaf,
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
  const isActive = (href) => router.pathname === href;

  return (
    <NavigationWrapper>
      
      <NavigationList>
        <NavigationItem>
          <NavigationLink
            href="/create-plant"
            $highlighted={router.pathname === "/create-plant"}
            aria-current={isActive("/create-plant") ? "page" : undefined}
          >
            <CreatePlant width={52} height={52} alt="Create Plant" />
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink
            href="/"
            $highlighted={router.pathname === "/"}
            aria-current={isActive("/") ? "page" : undefined}
          >
            <Home width={52} height={52} alt="Home" />
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink
            href="/my-plants"
            $highlighted={router.pathname === "/my-plants"}
            aria-current={isActive("/my-plants") ? "page" : undefined}
          >
            <MyPlants width={52} height={52} alt="My Plants" />
          </NavigationLink>
        </NavigationItem>
      </NavigationList>

       <Leaf aria-hidden style={{ left: "-45px", bottom: "-55px", transform: "scaleX(1) rotate(35deg)" }} />
      <Leaf aria-hidden style={{ right: "-45px", bottom: "-55px", transform: "scaleX(-1) rotate(35deg)" }} />
    </NavigationWrapper>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import {
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationWrapper,
} from "./StyledNavigation";

import Reminder from "public/assets/icons/Reminder.svg";
import Myplant from "public/assets/icons/myplant.svg";
import Home from "public/assets/icons/home.svg";

export default function Navigation() {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink href="/reminder" $highlighted={router.pathname === "/reminder"}>
          <Reminder width={52} height={52} />
          </NavigationLink>
          
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/" $highlighted={router.pathname === "/"}>
          <Home width={52} height={52} />
          
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/my-plants" $highlighted={router.pathname === "/my-plants"}>
          <Myplant width={52} height={52} />
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
}

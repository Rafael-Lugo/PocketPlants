import Link from "next/link";
import { useRouter } from "next/router";
import {
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationWrapper,
} from "./StyledNavigation";

import Reminder from "@/assets/icons/Reminder.svg";
import Myplant from "@/assets/icons/myplant.svg";
import Home from "@/assets/icons/home.svg";

export default function Navigation() {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink href="/reminder">
          <Reminder width={52} height={52} />
          </NavigationLink>
          
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/">
          <Home width={52} height={52} />
          
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/my-plants">
          <Myplant width={52} height={52} />
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
}

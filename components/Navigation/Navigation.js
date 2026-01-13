import Link from "next/link";
import { useRouter } from "next/router";
import {
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationWrapper,
} from "./StyledNavigation";


import Image from "next/image";

export default function Navigation() {
  const router = useRouter();

  return (
    <NavigationWrapper>
      <NavigationList>
        {/* <NavigationItem>
          <NavigationLink href="/reminder" $highlighted={router.pathname === "/reminder"}>
          <Reminder width={52} height={52} />
          </NavigationLink>
          
        </NavigationItem> */}

        <NavigationItem>
          <NavigationLink href="/" $highlighted={router.pathname === "/"}>
          <Image src="/assets/icons/home.svg" width={52} height={52} alt="Home" />
          
          </NavigationLink>
        </NavigationItem>

        <NavigationItem>
          <NavigationLink href="/my-plants" $highlighted={router.pathname === "/my-plants"}>
          <Image src="/assets/icons/myplant.svg" width={52} height={52} alt="My Plants" />
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </NavigationWrapper>
  );
}

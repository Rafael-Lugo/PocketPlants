import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <ul>
      <li>
        <Link href="/reminder">Reminder</Link>
      </li>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/my-plants">My plants</Link>
      </li>
    </ul>
  );
}

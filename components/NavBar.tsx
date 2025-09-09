import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <>
      <header className="bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-border sticky top-0 z-10 flex flex-row items-center justify-between border-b-10 p-4">
        <span>Convex + Next.js + Clerk</span>
        <div className="flex flex-row items-center gap-4">
          <span>🚀</span>
          <Link href="/">Home</Link>
          <Link href="/tasks">Tasks</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          {user && (
            <span>
              Welcome {user.fullName || user.emailAddresses[0]?.emailAddress}!
            </span>
          )}
          <UserButton />
        </div>
      </header>
    </>
  );
};

export default NavBar;

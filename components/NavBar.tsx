import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const NavBar = async () => {
  const user = await currentUser();

  return (
    <>
      <header className="bg-sidebar-primary text-sidebar-primary-foreground border-sidebar-ring sticky top-0 z-10 flex flex-row items-center justify-between border-b-10 p-4">
        <div className="flex flex-row items-center gap-20">
          <span>Convex + Next.js + Clerk</span>
          <span>🚀</span>
          <div>
            <Link href="/" className="mr-4">
              Home
            </Link>
            <Link href="/tasks">Tasks</Link>
          </div>
        </div>
        {user && <span>Welcome {user.fullName}!</span>}
        <UserButton />
      </header>
    </>
  );
};

export default NavBar;

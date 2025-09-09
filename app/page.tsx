"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SignUpButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <main className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-4xl font-bold">TaskFlow</h1>

          <p className="text-muted-foreground text-center">
            A modern task management application built with Next.js, Convex, and
            Clerk
          </p>
        </div>
        <Authenticated>
          <Content />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
};

export default HomePage;

function SignInForm() {
  return (
    <div className="mx-auto flex w-96 flex-col gap-8">
      <p>Log in to see the tasks</p>
      <SignInButton mode="modal">
        <button className="bg-foreground text-background rounded-md px-4 py-2">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-foreground text-background rounded-md px-4 py-2">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}

function Content() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8">
      <Link href="/tasks" className="btn">
        <Button>View Tasks</Button>
      </Link>
    </div>
  );
}

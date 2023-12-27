import Button from "@/components/button";
import { ArrowLeftIcon } from "@primer/octicons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center gap-8">
      <div>
        <h2 className="text-6xl md:text-8xl font-bold mb-2">404</h2>
        <p className="md:text-xl">Not Found</p>
      </div>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <ArrowLeftIcon />
          <p>Go home</p>
        </Button>
      </Link>
    </main>
  );
}

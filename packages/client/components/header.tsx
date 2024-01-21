import { MarkGithubIcon } from "@primer/octicons-react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="max-w-screen-xl mx-auto flex justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          Gistbin
        </Link>
        <Link
          href="https://github.com/schardev/gistbin"
          target="_blank"
          className="hover:text-accent">
          <MarkGithubIcon />
        </Link>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <h2 className="text-white font-semibold">Unity</h2>
      </div>
    </Link>
  );
};

export default Logo;

import Image from "next/image";
import Link from "next/link";
import React from "react";

import LogoImg from "@/assets/img/logo.png";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <Image width={100} alt="Logo" src={LogoImg} />
      </div>
    </Link>
  );
};

export default Logo;

import React from "react";
import Image from "next/image";
import Link from "next/link";

import LogoImg from "@/assets/img/logo.png";
import LogoIcon from "@/assets/img/logoIcon.png";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
        <Image width={100} alt="Logo" src={LogoImg} />
      </div>
      <div className="flex lg:hidden items-center gap-x-4 hover:opacity-75 transition mr-4">
        <Image width={48} alt="Logo" src={LogoIcon} />
      </div>
    </Link>
  );
};

export default Logo;

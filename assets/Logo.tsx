import Image from "next/image";
import Link from "next/link";
import React, { ImgHTMLAttributes } from "react";

const Logo = ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Link href="/">
      <Image
        {...props}
        src="/assets/logo.png"
        width={100}
        height={28}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;

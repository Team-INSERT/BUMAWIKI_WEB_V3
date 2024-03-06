import Image from "next/image";
import React, { ImgHTMLAttributes } from "react";

const Logo = ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Image
      {...props}
      src="/assets/logo.png"
      width={100}
      height={28}
      alt="logo"
    />
  );
};

export default Logo;

import Image from "next/image";
import Link from "next/link";
import { ImgHTMLAttributes } from "react";

const Logo = ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <Link href="/">
      <img
        {...props}
        src="https://avatars.fastly.steamstatic.com/1d7704885dcbb87e743f276bf30e01aa632e528f_full.jpg"
        width={100}
        height={28}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;

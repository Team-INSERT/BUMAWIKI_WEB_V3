import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import withPWA from "next-pwa";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `bumawiki_${hash}`,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA(
  withVanillaExtract({
    swcMinify: true,
    images: {
      domains: [
        "bumawiki.kro.kr",
        "lh3.googleusercontent.com",
        "media.tenor.com",
        "ifh.cc",
        "velog.velcdn.com",
        "bumawiki.s3.ap-northeast-2.amazonaws.com",
        "cdn.discordapp.com",
        "previews.123rf.com",
        "yt3.googleusercontent.com",
        "raw.githubusercontent.com",
      ],
    },
  }),
);

export default nextConfig;

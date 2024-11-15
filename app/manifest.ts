import type { MetadataRoute } from "next";

const manifest: () => MetadataRoute.Manifest = () => {
  const titleText = "부마위키";
  const descriptionText = "여러분이 가꾸어 나가는 역사의 고서";

  return {
    name: titleText,
    short_name: titleText,
    description: descriptionText,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#274168",
    icons: [
      {
        src: "/icon512_rounded.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
};

export default manifest;

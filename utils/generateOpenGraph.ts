const generateOpenGraph = <OG extends { title: string; description: string }>({
  title,
  description,
}: OG) => ({
  metadataBase: new URL("https://buma.wiki"),
  title: `부마위키 - ${title}`,
  description,
  icons: { icon: "/favicon.ico" },
  additionalLinkTags: [{ rel: "icon", href: "/favicon.ico" }],
  openGraph: {
    type: "website",
    title: `부마위키 - ${title}`,
    description,
    images:
      "https://bumawiki.s3.ap-northeast-2.amazonaws.com/file2a809fd7-66f4-421e-9b64-005b34ea8020",
  },
  other: {
    "og:image":
      "https://bumawiki.s3.ap-northeast-2.amazonaws.com/file2a809fd7-66f4-421e-9b64-005b34ea8020",
  },
});

export default generateOpenGraph;

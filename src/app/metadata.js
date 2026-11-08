const siteName = "DocSheba";

export function createPageMetadata({ title, description, keywords }) {
  return {
    title: `${siteName} | ${title}`,
    description,
    keywords: [siteName, ...keywords],
    authors: [{ name: siteName }],
    openGraph: {
      title: `${siteName} | ${title}`,
      description,
      siteName,
      locale: "en_BD",
      type: "website",
    },
  };
}

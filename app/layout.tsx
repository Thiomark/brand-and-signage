import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand and Signage",
  description: "Copies, Stickers, Mounted Prints & Business Signage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <style>{`@layer payload-default, payload;`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import "../styles/globals.scss";

export const metadata = {
  title: "Notes app",
  description: "Secure notes app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

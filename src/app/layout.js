import "./globals.css";

export const metadata = {
  title: "Noise Rules App",
  description: "Generated by Eyal Lampel",
  icons: {
    icon: "/LetterL.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"bla"}>{children}</body>
    </html>
  );
}
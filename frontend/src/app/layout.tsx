import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Food Order App",
  description: "Your food management app",
};

const montSerrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montSerrat.className}>
      <body>{children}</body>
    </html>
  );
}

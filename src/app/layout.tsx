import QueryClient from '@/components/providers/QueryClient';
import '@/styles/globals.css';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full h-full flex justify-center items-center bg-zinc-950 overflow-y-hidden p-6 lg:p-0">
        <QueryClient>{children}</QueryClient>
      </body>
    </html>
  );
}

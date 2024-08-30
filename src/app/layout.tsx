import { Metadata } from 'next';
import QueryClient from '@/components/providers/QueryClient';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Spotify Playlist Sync',
  description:
    'Sync Spotify playlists across accounts without publicly sharing or collaborating.',
  keywords: ['Spotify', 'playlist', 'copy', 'duplicate', 'clone', 'sync'],
  authors: [{ name: 'Adam Davies', url: 'https://acdvs.dev' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ''),
};

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

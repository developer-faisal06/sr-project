import '../index.css';
import './globals.css';

export const metadata = {
  title: 'SR Investment',
  description: 'SR Investment platform – Next.js migration',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="sr-safe-wrap" suppressHydrationWarning>
      <head />
      <body className="bg-navy-950 text-slate-100 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <header>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <title>My Next.js App</title>
        </Head>
        <nav className="flex items-center justify-between p-4">
          <Link href="/">Home</Link>
          <Link href="/timeline">Timeline</Link>
          <Link href="/tag">Tag</Link>
          <Link href="/about">About</Link>
          {/*  Search Bar */}
        </nav>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="container mx-auto flex justify-center p-1 text-xs">
        made by Raven
      </footer>
    </div>
  );
};

export default Layout;

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { NavBarMenuIcon, SearchIcon } from '@/components/Icons';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavbarProps {
  direction: 'horizontal' | 'vertical';
  menuOpen: boolean;
  toggleMenu: () => void;
}

/**
 * default: small screen
 * showIcon;
 * show Navbar vertically on bottom of header if showMenu
 *
 * bigger than sm:
 * !showIcon;
 * show Narbar horizontally on the right hand of header no matter what
 */

const Navbar: React.FC<NavbarProps> = ({ direction, menuOpen, toggleMenu }) => {
  const className = [
    'flex gap-5 mx-6 justify-center',
    'flex flex-col justify-center items-center sm:hidden',
  ];
  return (
    <nav>
      <ul
        className={`${
          direction === 'horizontal' ? className[0] : className[1]
        } text-base text-gray-700`}
      >
        <li className="">
          <Link
            onClick={menuOpen ? toggleMenu : undefined}
            href="/timeline"
            className="hover:underline"
          >
            Timeline
          </Link>
        </li>
        <li className="">
          <Link
            onClick={menuOpen ? toggleMenu : undefined}
            href="/tag"
            className="hover:underline"
          >
            Tag
          </Link>
        </li>
        <li className="">
          <Link
            onClick={menuOpen ? toggleMenu : undefined}
            href="/about"
            className="hover:underline"
          >
            About
          </Link>
        </li>
        <li className="">
          <Link href="/" className="f">
            <SearchIcon className="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="flex h-screen flex-col">
      <header className="flex flex-col">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <title>The Tiny Human</title>
        </Head>
        <div
          className={`flex items-center justify-between p-4 ${
            menuOpen ? 'border border-gray-200' : ''
          }`}
        >
          <Link
            onClick={menuOpen ? toggleMenu : undefined}
            href="/"
            className="border border-zinc-600 p-1 text-xl hover:border-dashed sm:mx-6"
          >
            TTH
          </Link>
          <div className="hidden sm:block">
            <Navbar direction="horizontal" menuOpen toggleMenu={toggleMenu} />
          </div>
          <button
            className="text-gray-500 hover:text-gray-900 sm:hidden"
            onClick={toggleMenu}
          >
            <NavBarMenuIcon className="sm:hidden" />
          </button>
        </div>
        {menuOpen && (
          <Navbar direction="vertical" menuOpen toggleMenu={toggleMenu} />
        )}
      </header>

      <main className="container mx-auto flex-1">{children}</main>
      <footer className="container mx-auto flex justify-center p-1 text-xs">
        made by Raven
      </footer>
    </div>
  );
};

export default Layout;

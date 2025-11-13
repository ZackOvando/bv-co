'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname() ?? '/';
  const isActive = (p: string) => pathname === p;

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // close mobile menu on route change
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    // close on ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* fixed header */}
      <div className="bg-[#0016DA] w-screen fixed top-0 left-0 z-50 flex flex-col justify-center items-center px-4 pb-4 pt-10">
        <div className="container w-full flex items-center justify-between">
          <h1 className="font-sans font-semibold text-white text-2xl">
            <Link href="/" className="inline-block">BrightView Group of Companies</Link>
          </h1>

          {/* Desktop nav (md and above) */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className={`text-white text-xl transition-[font-weight,text-decoration] duration-300 ease-in-out cursor-pointer hover:underline ${isActive('/') ? 'font-bold' : 'font-normal'
                }`}
            >
              Companies
            </Link>

            <a
              href="mailto:info@brightview.group"
              className="bg-transparent text-white border border-white px-4 py-2 rounded-md font-sans text-xl font-semibold hover:font-bold hover:bg-white hover:text-[#0016DA] transition-[font-weight,background-color,color] duration-300 ease-in-out cursor-pointer"
            >
              Get in touch
            </a>
          </nav>

          {/* Mobile toggle (below md) */}
          <div className="md:hidden flex items-center">
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md inline-flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              {/* simple hamburger / close icons */}
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown (below md) */}
        <div
          id="mobile-menu"
          className={`md:hidden px-4 transition-all duration-200 ease-in-out overflow-hidden bg-white/20 w-full rounded-lg ${mobileOpen ? 'max-h-60 py-4' : 'max-h-0'
            }`}
          aria-hidden={!mobileOpen}
        >
          <div className="rounded-md">
            <div className="flex flex-col gap-3 justify-center items-center text-center">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`text-white text-lg px-3 py-3 block w-full transition-colors duration-150 ${isActive('/') ? 'font-bold underline' : 'font-normal'
                  }`}
              >
                Companies
              </Link>

              <a
                href="mailto:info@brightview.group"
                onClick={() => setMobileOpen(false)}
                className="text-white text-lg px-3 py-3 block w-full border border-white/10 rounded-md text-center font-semibold hover:bg-white hover:text-[#0016DA] transition-colors duration-150"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* spacer so page content doesn't sit under fixed header */}
      <div className="h-[84px] md:h-[72px]" aria-hidden />
    </>
  );
};

export default Navigation;
import React from 'react';
import { Page, NavItem } from '../types';

interface HeaderProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

const navItems: NavItem[] = [
  { id: Page.OPS, label: 'OPS', path: '/ops' },
  { id: Page.LOGS, label: 'LOGS', path: '/logs' },
  { id: Page.LAB, label: 'LAB', path: '/lab' },
];

export const Header: React.FC<HeaderProps> = ({ activePage, setPage }) => {
  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-[#050505]/60 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300"
      style={{
        WebkitBackdropFilter: 'blur(12px)', // Ensure Glassmorphism works on Safari
      }}
    >
      {/* Logo */}
      <button 
        onClick={() => setPage(Page.HOME)}
        className="flex items-center gap-2 group"
        data-hover="true"
      >
        <span className="font-['Space_Grotesk'] font-bold text-2xl tracking-tighter text-white group-hover:text-[#FF5F00] transition-colors">
          ZEROED
        </span>
      </button>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`text-sm font-['Inter'] font-medium tracking-widest transition-colors ${
              activePage === item.id ? 'text-[#FF5F00]' : 'text-zinc-400 hover:text-white'
            }`}
            data-hover="true"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <button
        onClick={() => setPage(Page.INITIATE)}
        className="bg-[#FF5F00] hover:bg-white text-black font-['Space_Grotesk'] font-bold text-sm px-6 py-2 uppercase tracking-wide transition-all hover:scale-105"
        data-hover="true"
      >
        Initiate
      </button>
    </header>
  );
};
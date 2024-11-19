'use client'

import React, { useState } from 'react';
import { Rock_3D } from 'next/font/google';

const rock3D = Rock_3D({
  subsets: ['latin'],
  weight: ['400'], // Rock 3D só tem peso regular (400)
});

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="absolute top-0 left-0 w-full h-32 p-4  text-black z-10  border-black">
      <div className="flex justify-between items-center h-full">
        <h1 className={`${rock3D.className} text-7xl font-bold m-top`} style={{ display: 'inline-block', marginTop: '500px' }}>
          {Array.from("I A").map((char, index) => (
            <span key={index} style={{ display: 'block', marginBottom: '10px' }}>{char}</span>
          ))}
        </h1>
        <button onClick={toggleMenu} className={`${rock3D.className} text-lg font-bold md:hidden`}>
          ☰
        </button>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-lg font-bold underline">Home</a>
          <a href="#" className="text-lg font-bold underline">Sobre</a>
          <a href="#" className="text-lg font-bold underline">Contato</a>
        </nav>
      </div>
      <div className={`fixed inset-0 bg-black bg-opacity-75 z-20 flex flex-col items-center justify-center transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-white text-3xl">
          &times;
        </button>
        <nav className={`${rock3D.className} text-5xl font-bold space-y-4 space-x-4 text-white text-center decoration-slice`}>
          <a href="#" className="text-2xl font-bold text-white underline">Sobre</a>
          <a href="#" className="text-2xl font-bold text-white underline">Contato</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
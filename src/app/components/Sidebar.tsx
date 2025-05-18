import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white border-r flex flex-col py-8 px-6 shadow-sm`}
        style={{ minHeight: '100vh' }}
      >
        <div className="mb-10 flex items-center gap-2 justify-between">
          {/* Logo */}
          <span className="text-2xl font-bold ">Jihun AI</span>
          <button
            className="ml-auto text-gray-400 hover:text-gray-700 text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Hide sidebar"
          >
            ×
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-600 font-semibold">
                <span className="material-icons">home</span>
                Overview
              </a>
            </li>
            <li>
              <Link href="/playground" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span className="material-icons">code</span>
                API Playground
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span className="material-icons">star</span>
                Use Cases
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span className="material-icons">credit_card</span>
                Billing
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span className="material-icons">settings</span>
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <span className="material-icons">description</span>
                Documentation
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-10">
          <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Personal</button>
        </div>
      </aside>
      {/* Sidebar open button */}
      {!open && (
        <button
          className="fixed top-6 left-2 z-50 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition-colors"
          onClick={() => setOpen(true)}
          aria-label="Show sidebar"
        >
          <span className="material-icons">menu</span>
        </button>
      )}
    </>
  );
};

export default Sidebar;

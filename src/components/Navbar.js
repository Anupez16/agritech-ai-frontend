'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Home, Sprout, Bug, Clock } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <span className="font-bold text-xl">AgriTech AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')
                  ? 'bg-green-700'
                  : 'hover:bg-green-700'
                }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/crop-recommendation"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/crop-recommendation')
                  ? 'bg-green-700'
                  : 'hover:bg-green-700'
                }`}
            >
              <Sprout className="h-4 w-4" />
              <span>Crop Recommendation</span>
            </Link>

            <Link
              href="/disease-detection"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/disease-detection')
                  ? 'bg-green-700'
                  : 'hover:bg-green-700'
                }`}
            >
              <Bug className="h-4 w-4" />
              <span>Disease Detection</span>
            </Link>


            <Link
              href="/history"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/history')
                  ? 'bg-green-700'
                  : 'hover:bg-green-700'
                }`}
            >
              <Clock className="h-4 w-4" />
              <span>History</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
import React from 'react';

interface NavProps {
  current: string;
  onNavigate: (route: any) => void;
  /**
   * Optional loyalty point balance to display. If provided, it will be
   * rendered alongside the navigation links. If omitted, the points
   * indicator is hidden.
   */
  points?: number;
}

// List of navigation items exposed in the top navbar. Each item points to
// a route string understood by the App component. Additional links may be
// added here to expand the menu without modifying navigation logic.
const navItems: { label: string; route: any }[] = [
  { label: 'Home', route: 'home' },
  { label: 'About', route: 'about' },
  { label: 'Radio', route: 'radio' },
  { label: 'Shop', route: 'shop' },
  { label: 'Care', route: 'care' },
  { label: 'Earn', route: 'earn' },
  { label: 'Blueprints', route: 'blueprints' },
  { label: 'Privacy', route: 'privacy' },
  { label: 'Terms', route: 'terms' },
  { label: 'Cookies', route: 'cookies' },
  { label: 'Accessibility', route: 'accessibility' },
  // Newly added pages for the manifesto features
  { label: 'Leaderboard', route: 'leaderboard' },
  { label: 'Heat Globe', route: 'heatglobe' },
  { label: 'Rooms', route: 'rooms' },
];

export default function Nav({ current, onNavigate, points }: NavProps) {
  return (
    <nav className="relative bg-[#1a1a1a] border-b border-[#2c0000]">
      <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 py-4">
        {navItems.map(item => (
          <li key={item.route}>
            <button
              className={`px-3 py-2 rounded text-sm font-bold transition-colors duration-150
                ${current === item.route ? 'bg-red-700 text-white' : 'text-[#f2c122] hover:bg-red-700 hover:text-white'}`}
              onClick={() => onNavigate(item.route)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      {typeof points === 'number' && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs md:text-sm text-[#f2c122] font-bold">
          Points: {points}
        </div>
      )}
    </nav>
  );
}
// components/ui/dropdown-menu.tsx
'use client'

import { useState, ReactNode } from 'react'
import { Menu } from 'lucide-react'

interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function DropdownMenuItem({ children, onClick }: DropdownMenuItemProps) {
  return (
    <button
      type="button"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  return (
    <div>
      {children}
    </div>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
}

export function DropdownMenuContent({ children }: DropdownMenuContentProps) {
  return (
    <div>
      {children}
    </div>
  );
}
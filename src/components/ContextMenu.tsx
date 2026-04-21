import React from 'react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

interface ContextMenuProps {
  items: MenuItem[];
  position: { x: number; y: number };
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ items, position, onClose }) => {
  return (
    <div
      className="fixed z-50 bg-white border border-gray-300 rounded-md shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseLeave={onClose}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          disabled={item.disabled}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 whitespace-nowrap ${
            item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'
          } ${item.danger ? 'text-red-600' : 'text-gray-700'}`}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

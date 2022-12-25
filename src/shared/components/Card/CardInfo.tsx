import React from 'react';

type CardInfoProps = {
  title?: string;
  children: React.ReactNode;
  header?: React.ReactElement;
  className?: string;
};

export const CardInfo: React.FC<CardInfoProps> = ({
  title,
  children,
  header,
  className = 'col-span-6'
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      <div className="p-4 border-b border-gray-300 border-1">
        {header ? header : <span className="font-medium text-lg text-zinc-700">{title}</span>}
      </div>
      {children}
    </div>
  );
};

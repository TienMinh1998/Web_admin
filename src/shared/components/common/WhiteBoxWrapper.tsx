import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};
export const WhiteBoxWrapper: React.FC<Props> = ({ children, className = '' }) => {
  return <div className={`bg-white rounded mb-4 p-4 shadow ${className}`}>{children}</div>;
};

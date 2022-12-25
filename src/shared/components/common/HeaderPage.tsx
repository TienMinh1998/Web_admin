import React from 'react';
import { WhiteBoxWrapper } from './WhiteBoxWrapper';

type Props = {
  children: React.ReactNode;
  extraButton?: React.ReactNode;
  className?: string;
  title: string;
};
export const HeaderPage: React.FC<Props> = ({ children, className = '', title, extraButton }) => {
  return (
    <div className={`sticky top-0 ${className}`}>
      <WhiteBoxWrapper>
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{title}</div>
          {extraButton}
        </div>

        {children}
      </WhiteBoxWrapper>
    </div>
  );
};

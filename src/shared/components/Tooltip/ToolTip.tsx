import React from 'react';
import './Tooltip.css';
export interface ITooltip {
  title: string | JSX.Element;
  children: React.ReactNode;
  position?: string;
  containerClass?: string;
  theme?: 'dark' | 'light';
}

export const ToolTip: React.FC<ITooltip> = ({
  title,
  children,
  position = 'top',
  containerClass = '',
  theme = 'dark'
}) => {
  return (
    <div className={`tooltip ${containerClass}`}>
      {children}
      <div className={`tooltiptext ${theme === 'dark' ? `dark` : `light`} tooltip-${position}`}>
        {title}
        <span className="arrow-tooltip"></span>
      </div>
    </div>
  );
};

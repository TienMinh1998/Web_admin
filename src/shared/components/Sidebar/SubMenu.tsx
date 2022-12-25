import React from 'react';
import { Path, PathMatch, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface SubMenuProps {
  children: React.ReactNode;
  to: string;
}
export const SubMenu: React.FC<SubMenuProps> = ({ children, to }) => {
  const resolved: Path = useResolvedPath(to);
  const match: PathMatch<string> | null = useMatch({ path: resolved.pathname, end: true });
  const navigate = useNavigate();

  return (
    <div className={`rounded ${match ? 'bg-primary-color' : ''}`}>
      <div
        className={`p-2 ml-4  border-[#17456f] ${match ? '' : 'border-l'}`}
        onClick={() => {
          navigate(to);
        }}>
        {children}
      </div>
    </div>
  );
};

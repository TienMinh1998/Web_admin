import React, { useState, useEffect } from 'react';
import { Path, PathMatch, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { TSubMenu } from 'shared/types/interface';
import { SubMenu } from './SubMenu';
import { AiOutlineUp } from 'react-icons/ai';

type MenuProps = {
  children?: React.ReactNode;
  menuItem: TSubMenu;
};
export const Menu: React.FC<MenuProps> = ({ menuItem }) => {
  const navigate = useNavigate();
  const resolved: Path = useResolvedPath(menuItem.to);
  const match: PathMatch<string> | null = useMatch({ path: resolved.pathname, end: true });

  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    if (match) {
      setActive(true);
    }
  }, []);
  return (
    <div
      onClick={() => {
        !menuItem.childrens && navigate(menuItem.to);
      }}
      className={`cursor-pointer px-4 py-2`}>
      <span
        className={`flex justify-between p-2 rounded  ${
          match && !menuItem.childrens ? 'bg-primary-color' : 'hover:bg-[#17456f]'
        }`}
        onClick={() => setActive(!active)}>
        <span className="flex items-center">
          <span className="mr-2"> {menuItem?.icon}</span>
          {menuItem.title}
        </span>

        <div className={`duration-300 origin-center ${active ? 'rotate-180' : ''}`}>
          {menuItem.childrens ? <AiOutlineUp /> : <></>}
        </div>
      </span>

      <div className={`duration-300 ${active && menuItem.childrens ? 'block' : 'hidden'}`}>
        {menuItem.childrens?.map((submenu: TSubMenu, index: number) => (
          <SubMenu to={submenu.to} key={`${submenu.to + index}`}>
            {submenu.title}
          </SubMenu>
        ))}
      </div>
    </div>
  );
};

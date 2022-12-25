import R from 'assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { Menu } from './Menu';
import './Menu.css';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate(PROTECTED_ROUTES_PATH.HOME);
  };
  return (
    <div className="h-full w-full text-white overflow-y-auto flex flex-col justify-between">
      <div className="border-b border-color-border-2">
        <div className="p-4">
          <div className="flex justify-center items-center ">
            <img
              alt="logo"
              src={R.images.logo_ver1}
              style={{ width: '60%', minWidth: '100px' }}
              className="rounded cursor-pointer"
              onClick={goToHomePage}
            />
          </div>
        </div>
      </div>

      <Menu />
    </div>
  );
};

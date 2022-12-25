import React from 'react';
import { Menu } from 'shared/components/Sidebar/MenuItem';
import { TSubMenu } from 'shared/types/interface';

type GroupMenuProps = {
  groupMenu: Array<TSubMenu>;
};

export const GroupMenu: React.FC<GroupMenuProps> = ({ groupMenu }) => {
  return (
    <div>
      {groupMenu.map((item: TSubMenu, index: number) => {
        return <Menu key={index} menuItem={item} />;
      })}
    </div>
  );
};

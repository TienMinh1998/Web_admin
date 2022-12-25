import React, { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { PROTECTED_ROUTES_PATH } from 'routes/RoutesPath';
import { TGroupMenu } from 'shared/types/interface';
import { GroupMenu } from './GroupMenu';
import './Menu.css';

const MENU: Array<TGroupMenu> = [
  {
    keyGroup: '1',
    groupMenu: [{ title: 'Dashboard', to: PROTECTED_ROUTES_PATH.HOME, icon: <AiFillHome /> }]
  },
  {
    titleGroup: 'Question',
    keyGroup: '5',
    groupMenu: [
      {
        title: 'Topic question',
        to: PROTECTED_ROUTES_PATH.CATEGORY_QUESTION,
        icon: <BiCategoryAlt />
      },
      {
        title: 'Questions',
        to: PROTECTED_ROUTES_PATH.QUESTION,
        icon: <BsFillPatchQuestionFill />
      }
    ]
  }
];

export const Menu: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('');

  const classActive = (key: string) => {
    return activeGroup === key ? 'bg-second-bold-color' : '';
  };

  return (
    <div className="scrollbar-menu overflow-y-auto overflow-x-hidden flex-1 ">
      {MENU.map((groupMenu: TGroupMenu) => (
        <div
          key={groupMenu.keyGroup}
          className={`border-t border-color-border-2 ${classActive(groupMenu.keyGroup)} `}
          onClick={() => {
            setActiveGroup(groupMenu.keyGroup);
          }}>
          <div>
            {groupMenu.titleGroup && (
              <div className="font-bold text-base text-gray-400 px-4 pt-4">
                {groupMenu.titleGroup}
              </div>
            )}
          </div>

          <GroupMenu groupMenu={groupMenu.groupMenu} />
        </div>
      ))}
    </div>
  );
};

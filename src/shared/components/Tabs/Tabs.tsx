import React, { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

type TTabsItem = {
  tabIndex: string;
  label: string;
  content: any;
};

type TTabs = {
  tabs: Array<TTabsItem>;
};

export const Tabs: React.FC<TTabs> = ({ tabs }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tabIndex') || '1');
  const onChangeTab = (value: string) => {
    navigate({
      search: createSearchParams({
        tabIndex: value
      }).toString()
    });
    setActiveTab(value);
  };

  const activeClass = (tabIndex: string) => {
    return tabIndex === activeTab ? 'text-primary-color bg-blue-100' : '';
  };

  const renderTabs = (
    <div className="px-3 py-2 flex justify-start bg-white shadow-md ">
      {tabs.map((tab) => {
        return (
          <div
            key={tab.tabIndex}
            className={`py-2 px-6 cursor-pointer rounded font-semibold ${activeClass(
              tab.tabIndex
            )}`}
            onClick={() => {
              onChangeTab(tab.tabIndex);
            }}>
            {tab.label}
          </div>
        );
      })}
    </div>
  );

  const renderContentTabs = (
    <div>
      {tabs.map((tab) => tab.tabIndex === activeTab && <div key={tab.tabIndex}>{tab.content}</div>)}
    </div>
  );

  return (
    <div>
      {renderTabs}
      {renderContentTabs}
    </div>
  );
};

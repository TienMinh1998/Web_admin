import React from 'react';

export default function FilterPage({ filters }: any) {
  return (
    <div className="grid grid-cols-12 gap-x-2 gap-y-4 mt-4">
      {Object.keys(filters).map((key: string) => {
        const { className, label, component } = filters[key];
        return (
          <div key={key} className={`${className ? className : 'col-span-3'}`}>
            <div className="font-bold text-gray-500 mb-2">{label}</div>
            {component}
          </div>
        );
      })}
    </div>
  );
}

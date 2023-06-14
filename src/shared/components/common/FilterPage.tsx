import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { Button } from '../Button';

export default function FilterPage({ filters, goToCreateProduct }: any) {
  return (
    <div className="grid grid-cols-12 gap-x-2 gap-y-4">
      {Object.keys(filters).map((key: string) => {
        const { className, label, component } = filters[key];
        return (
          <div key={key} className={`${className ? className : 'col-span-3'}`}>
            {/* <div className="font-bold text-gray-500 mb-2">{label}</div> */}
            {component}
          </div>
        );
      })}
      <div className="col-span-2 flex justify-end">
        <Button
          className="flex items-center justify-center h-8"
          onClick={() => {
            goToCreateProduct();
          }}>
          <BiPlusCircle className="mr-1" />
          Thêm bài viết
        </Button>
      </div>
    </div>
  );
}

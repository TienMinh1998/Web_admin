import React from 'react';

const Item: any = () => null;

const BreadcrumbComp = ({ children }: any) => {
  let item = [];
  if (children.length) {
    item = [...children].filter((el: any) => el.type.name === 'Item');
  } else if (children?.type.name === 'Item') {
    item = [children];
  }
  return (
    <div>
      {item &&
        item.map((x: any, index: number) => {
          if (index !== item.length - 1) {
            return (
              <span key={index}>
                <span className="px-2">{x.props.children}</span>
                <span> &gt;</span>
              </span>
            );
          }
          return (
            <span key={index} className="px-2 font-medium text-primary-color">
              {x.props.children}
            </span>
          );
        })}
    </div>
  );
};

BreadcrumbComp.Item = Item;

export default BreadcrumbComp;

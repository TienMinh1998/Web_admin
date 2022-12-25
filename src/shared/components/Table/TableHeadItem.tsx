import React from 'react';
import { IColumn } from 'shared/types/interface';

export type TableHeadProps = { item: IColumn; width?: number; onClickRow?: () => void };

const TableHeadItem: React.FC<TableHeadProps> = ({ item, width, onClickRow }) => {
  return (
    <td
      title={item.title}
      style={{ width: `${width}px` }}
      onClick={() => {
        onClickRow && onClickRow();
      }}>
      <div className="td-table-cell">{item.title}</div>
    </td>
  );
};

export default TableHeadItem;

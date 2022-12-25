import { Checkbox } from 'antd';
import React from 'react';
import { RowType } from 'shared/types/interface';

const TableRow: React.FC<RowType> = ({ row, loading, rowSelection, recordRow, onItemCheck }) => {
  return (
    <tr>
      {rowSelection ? (
        <td>
          <Checkbox
            onChange={() => {
              onItemCheck && onItemCheck(recordRow);
            }}
          />
        </td>
      ) : (
        <></>
      )}
      {row.map((item: any, index: number) => {
        return (
          <td key={index}>
            <div className="td-table-cell">{loading ? 'loading' : <>{item}</>}</div>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;

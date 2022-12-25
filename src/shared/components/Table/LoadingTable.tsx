import { Checkbox } from 'antd';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { IColumn } from 'shared/types/interface';
import './style.css';

type Props = {
  loading?: boolean;
  children?: React.ReactNode;
  rowSelection?: boolean;
  columns: Array<IColumn>;
};
export const LoadingTable: React.FC<Props> = ({ loading, children, rowSelection, columns }) => {
  return (
    <>
      {loading ? (
        <>
          {Array.from(Array(5).keys()).map((item: number) => {
            return (
              <tr key={item}>
                {rowSelection ? (
                  <td>
                    <Checkbox />
                  </td>
                ) : (
                  <></>
                )}

                {columns.map((item: IColumn) => {
                  return (
                    <td key={item.keyData}>
                      <div className="td-table-cell">
                        <Skeleton style={{ width: '50%' }} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      ) : (
        children
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import TableHeadItem from './TableHeadItem';
import TableRow from './TableRow';
import './style.css';
import { IColumn, TableProps } from 'shared/types/interface';
import { Pagination } from '../Pagination/Pagination';
import { Checkbox } from 'antd';
import { LoadingTable } from './LoadingTable';
import { GiSherlockHolmes } from 'react-icons/gi';
import { useTable } from './hook/useTable';

export const Table: React.FC<TableProps> = ({
  columns,
  dataSource = [],
  customClass = '',
  onClickRow,
  rowSelection,
  loading,
  position = 'bottom-right',
  paging,
  height
}) => {
  const [lastDataTable, setLastDataTable] = useState<Array<any>>([]);

  const { indeterminate, masterSelected, selectedRows, onItemCheck, onMasterCheck } = useTable({
    rowSelection,
    lastDataTable,
    setLastDataTable
  });

  useEffect(() => {
    const fake = dataSource.map((item: any) => ({ ...item, checked: false }));

    setLastDataTable(fake);
  }, [dataSource]);

  const positionPagination = (value: string) => {
    switch (value) {
      case 'left':
        return 'left';
      case 'center':
        return 'center';
      case 'right':
        return 'right';
      default:
        return 'right';
    }
  };

  const renderHeaderTable = () => {
    return (
      <tr>
        {/* rowSelection is true. Table will display column checkbox */}
        {rowSelection && (
          <td>
            <Checkbox
              indeterminate={indeterminate}
              checked={masterSelected}
              onChange={onMasterCheck}
            />
          </td>
        )}

        {columns.map((item: IColumn) => {
          return <TableHeadItem key={item.title} item={item} width={item.width} />;
        })}
      </tr>
    );
  };

  const renderRows = () => {
    return (
      <>
        <LoadingTable loading={loading} columns={columns} rowSelection={rowSelection}>
          {lastDataTable.length ? (
            <>
              {lastDataTable.map((item: any) => {
                const row = columns.map((column: IColumn, index: number) => {
                  if (column.render) {
                    return column.render(item[column.keyData], index, item);
                  } else {
                    return item[column.keyData];
                  }
                });
                return (
                  <TableRow
                    key={item.id}
                    row={row}
                    recordRow={item}
                    onClickRow={onClickRow}
                    rowSelection={rowSelection}
                    onItemCheck={onItemCheck}
                  />
                );
              })}
            </>
          ) : (
            <td colSpan={columns.length}>
              <div className="td-table-empty">
                <div className="flex flex-col items-center text-gray-400">
                  <GiSherlockHolmes className="text-6xl" />
                  <span className="text-xl">No data</span>
                </div>
              </div>
            </td>
          )}
        </LoadingTable>
      </>
    );
  };

  const renderPagination = (
    <Pagination
      total={paging?.total || lastDataTable.length}
      pageSize={paging?.pageSize}
      currentPage={paging?.currentPage}
      position={positionPagination(position.split('-')[1])}
      onChangePage={(page: number) => {
        paging?.onChangePage && paging.onChangePage(page);
      }}
    />
  );

  return (
    <>
      {/* render pagination when position is top */}
      {lastDataTable.length ? (
        <div className={`mb-2 ${position.split('-')[0] === 'top' ? '' : 'hidden'}`}>
          {renderPagination}
        </div>
      ) : (
        <></>
      )}

      {/* render table */}
      <div className={`td-table-wrapper`}>
        <table className={`${customClass} td-table`}>
          <thead className="td-table-head">{renderHeaderTable && renderHeaderTable()}</thead>
          <tbody className="td-table-body">{renderRows && renderRows()}</tbody>
        </table>
      </div>

      {/* render pagination when position is bottom */}
      {lastDataTable.length ? (
        <div className={`mt-2 ${position.split('-')[0] === 'bottom' ? '' : 'hidden'} `}>
          {renderPagination}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

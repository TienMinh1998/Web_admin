import React, { useState, useEffect } from 'react';
import { Table } from './Table';

export default function DemoTable() {
  const [loading, setLoading] = useState<boolean>(false);
  const columns = [
    {
      title: 'Name',
      keyData: 'name',
      width: 200,
      render: (value: any, index: number, record: any) => (
        <div className="text-red-500">
          {record.name} - {record.phone}
        </div>
      )
    },
    { title: 'Email', keyData: 'email' },
    { title: 'Phone', keyData: 'phone' },
    { title: 'Company', keyData: 'company' },
    { title: 'Name1', keyData: 'name1' },
    { title: 'Name2', keyData: 'name2' },
    { title: 'Name3', keyData: 'name3' },
    { title: 'Date', keyData: 'date' }
  ];
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setDataSource([
          {
            key: 1,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021',
            change: 'sadfasdf'
          },
          {
            key: 2,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 3,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 4,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 5,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021',
            change: 'sadfasdf'
          },
          {
            key: 6,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 7,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 8,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 9,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021',
            change: 'sadfasdf'
          },
          {
            key: 10,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          },
          {
            key: 11,
            name: 'John',
            email: 'john@email.com',
            phone: '0912270312',
            company: 'CMC',
            name1: 'Name1',
            name2: 'Name2',
            name3: 'Name3',
            date: '01/01/2021'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Exception ' + error);
    }
  };

  const rowSelection = {
    onChangeSelected: (selectedRowKeys: string | number, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name
    // })
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowSelection={rowSelection}
      />
    </div>
  );
}
